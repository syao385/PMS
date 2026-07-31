import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details
from app.services.skill_engine import execute_skill_runner

class TestAAPLQuarterlyAudit(unittest.TestCase):

    def test_aapl_live_quote_extended_hours_accuracy(self):
        quote = fetch_live_quote("AAPL")
        self.assertEqual(quote["symbol"], "AAPL")
        self.assertEqual(quote["current_price"], 313.30, "AAPL current price must equal Moomoo after-hours price $313.30")
        self.assertEqual(quote["previous_close"], 333.58, "AAPL previous close must equal $333.58")
        self.assertEqual(quote["price_change_24h"], -6.08, "AAPL price change % must equal -6.08%")

    def test_aapl_q3_2026_earnings_details_moomoo_match(self):
        details = fetch_latest_earnings_details("AAPL", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 85780.0, "AAPL reported revenue must equal $85,780.0M ($85.78B)")
        self.assertEqual(details["revenue_surprise_pct"], 0.42, "AAPL revenue surprise must equal +0.42% per Moomoo")
        self.assertEqual(details["net_income_reported_m"], 21450.0, "AAPL net income must equal $21,450.0M ($21.45B)")
        self.assertEqual(details["net_income_surprise_pct"], 7.63, "AAPL net income surprise must equal +7.63% per Moomoo")

    def test_aapl_report_contains_thesis_drift_and_news_pulse_sections(self):
        res = execute_skill_runner("earnings-review", "AAPL", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("Thesis Drift Delta & Quarterly Moat Audit", md, "Report must contain dedicated Thesis Drift section")
        self.assertIn("News Pulse & 盘后股价异动归因分析", md, "Report must contain dedicated News Pulse section")
        self.assertIn("-6.08%", md, "Report must attribute AAPL -6.08% price move")

if __name__ == "__main__":
    unittest.main()
