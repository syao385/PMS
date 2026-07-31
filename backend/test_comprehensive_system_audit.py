import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details, fetch_live_news
from app.services.skill_engine import execute_skill_runner

class TestComprehensiveSystemAudit(unittest.TestCase):

    def test_amzn_moomoo_live_figures(self):
        quote = fetch_live_quote("AMZN")
        self.assertGreater(quote["current_price"], 0.0, "AMZN current_price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "AMZN previous_close must be > 0")

        details = fetch_latest_earnings_details("AMZN", "2026Q2")
        self.assertGreater(details["revenue_reported_m"], 0.0, "AMZN revenue reported must be > 0")
        self.assertEqual(details["audit_verification_passed"], True, "AMZN earnings must pass Financial Gatekeeper")

    def test_pltr_moomoo_live_price_and_historical_q1(self):
        quote = fetch_live_quote("PLTR")
        self.assertGreater(quote["current_price"], 0.0, "PLTR price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "PLTR previous_close must be > 0")

        q1_details = fetch_latest_earnings_details("PLTR", "2026Q1")
        self.assertEqual(q1_details["period_ending_date"], "2026-03-31", "PLTR Q1 period ending date must be 2026-03-31")
        self.assertGreaterEqual(q1_details["revenue_reported_m"], 1600.0, "PLTR Q1 revenue reported must equal $1.633B ($1632.58M)")
        self.assertEqual(q1_details["audit_verification_passed"], True, "PLTR Q1 earnings must pass Financial Gatekeeper")

    def test_meta_moomoo_live_figures(self):
        quote = fetch_live_quote("META")
        self.assertGreater(quote["current_price"], 0.0, "META price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "META previous_close must be > 0")

        details = fetch_latest_earnings_details("META", "2026Q2")
        self.assertGreater(details["revenue_reported_m"], 0.0, "META revenue reported must be > 0")
        self.assertEqual(details["audit_verification_passed"], True, "META earnings must pass Financial Gatekeeper")

    def test_aapl_moomoo_live_figures(self):
        quote = fetch_live_quote("AAPL")
        self.assertGreater(quote["current_price"], 0.0, "AAPL price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "AAPL previous_close must be > 0")
        self.assertIsNotNone(quote["price_change_24h"], "AAPL price_change_24h must not be None")

    def test_mu_sec_edgar_filing_figures(self):
        quote = fetch_live_quote("MU")
        self.assertGreater(quote["current_price"], 0.0, "MU price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "MU previous_close must be > 0")

        details = fetch_latest_earnings_details("MU", "2026Q3")
        self.assertIn("2026", details["period_ending_date"], "MU period ending date must contain 2026")
        self.assertGreater(details["revenue_reported_m"], 0.0, "MU revenue reported must be > 0")
        self.assertEqual(details["audit_verification_passed"], True, "MU earnings must pass Financial Gatekeeper")






        details = fetch_latest_earnings_details("AAPL", "2026Q3")
        self.assertEqual(details["revenue_surprise_pct"], 0.42, "AAPL revenue surprise % must equal +0.42%")
        self.assertEqual(details["net_income_surprise_pct"], 7.63, "AAPL net income surprise % must equal +7.63%")


    def test_news_feed_sources_clean_of_sec_edgar(self):
        news = fetch_live_news("AMZN", count=10)
        for n in news:
            self.assertNotIn("SEC EDGAR", n["source"], "News provider label must not contain SEC EDGAR")

    def test_earnings_review_report_generation(self):
        res = execute_skill_runner("earnings-review", "AMZN", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        self.assertIn("Thesis Drift Delta & Quarterly Moat Audit", md)
        self.assertIn("News Pulse & 盘后股价异动归因分析", md)
        self.assertIn("0.85%", md, "Report must display exact revenue surprise +0.85%")


if __name__ == "__main__":
    unittest.main()
