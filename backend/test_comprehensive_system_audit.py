import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details, fetch_live_news
from app.services.skill_engine import execute_skill_runner

class TestComprehensiveSystemAudit(unittest.TestCase):

    def test_amzn_moomoo_live_figures(self):
        quote = fetch_live_quote("AMZN")
        self.assertEqual(quote["current_price"], 257.26, "AMZN extended-hours price must equal $257.26")
        self.assertEqual(quote["price_change_24h"], 9.24, "AMZN extended-hours price change % must equal +9.24%")

        details = fetch_latest_earnings_details("AMZN", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 154170.0, "AMZN revenue reported must equal $154.17B")
        self.assertEqual(details["revenue_surprise_pct"], 4.17, "AMZN revenue surprise % must equal +4.17% per Moomoo")
        self.assertEqual(details["eps_reported"], 1.26, "AMZN reported EPS must equal $1.26")
        self.assertEqual(details["eps_surprise_pct"], 6.38, "AMZN EPS surprise % must equal +6.38% per Moomoo")

    def test_pltr_moomoo_live_price_and_historical_q1(self):
        quote = fetch_live_quote("PLTR")
        self.assertEqual(quote["current_price"], 123.35, "PLTR price must equal Moomoo real-time $123.35")
        self.assertEqual(quote["price_change_24h"], 0.88, "PLTR price change % must equal +0.88%")

        # Test Q1 2026 Historical Back-Loading (May 4, 2026)
        q1_details = fetch_latest_earnings_details("PLTR", "2026Q1")
        self.assertEqual(q1_details["revenue_surprise_pct"], 5.85, "PLTR Q1 2026 revenue surprise must equal +5.85%")
        self.assertEqual(q1_details["eps_surprise_pct"], 18.96, "PLTR Q1 2026 EPS surprise must equal +18.96%")

        # Test Q2 2026 Upcoming Release Date (Aug 3, 2026 AMC)
        q2_details = fetch_latest_earnings_details("PLTR", "2026Q2")
        self.assertIn("2026-08-03", q2_details["earnings_release_date"], "PLTR Q2 release date must be 2026-08-03 AMC")


    def test_meta_moomoo_live_figures(self):
        quote = fetch_live_quote("META")
        self.assertEqual(quote["current_price"], 544.74, "META extended-hours price must equal $544.74")
        self.assertEqual(quote["price_change_24h"], 1.08, "META price change % must equal +1.08%")

        details = fetch_latest_earnings_details("META", "2026Q2")
        self.assertEqual(details["revenue_surprise_pct"], 0.85, "META revenue surprise % must equal +0.85%")
        self.assertEqual(details["net_income_surprise_pct"], -15.62, "META net income surprise % must equal -15.62%")

    def test_aapl_moomoo_live_figures(self):
        quote = fetch_live_quote("AAPL")
        self.assertEqual(quote["current_price"], 313.30, "AAPL extended-hours price must equal $313.30")
        self.assertEqual(quote["price_change_24h"], -6.08, "AAPL price change % must equal -6.08%")

        details = fetch_latest_earnings_details("AAPL", "2026Q2")
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
        self.assertIn("4.17%", md, "Report must display exact revenue surprise +4.17%")

if __name__ == "__main__":
    unittest.main()
