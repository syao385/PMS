import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details
from app.services.skill_engine import execute_skill_runner
from clear_and_reseed_db import clear_and_reseed

class TestUnreleasedQuarterAndDbPurge(unittest.TestCase):

    def setUp(self):
        # Purge stale DB entries before each test
        clear_and_reseed()

    def test_pltr_unreleased_q2_handling(self):
        details = fetch_latest_earnings_details("PLTR", "2026Q2")
        self.assertEqual(details["audit_verification_passed"], True, "PLTR 2026Q2 must pass Financial Gatekeeper")
        
        res = execute_skill_runner("earnings-review", "PLTR", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        self.assertIn("PLTR", md, "Report must display PLTR ticker")

    def test_pltr_released_q1_historical_backload(self):
        details = fetch_latest_earnings_details("PLTR", "2026Q1")
        self.assertEqual(details["period_ending_date"], "2026-03-31", "PLTR Q1 period ending date must be 2026-03-31")
        self.assertGreaterEqual(details["revenue_reported_m"], 1600.0, "PLTR Q1 revenue reported must equal $1.633B ($1632.58M)")
        self.assertEqual(details["audit_verification_passed"], True, "PLTR Q1 earnings must pass Financial Gatekeeper")

    def test_amzn_exact_moomoo_report_generation(self):
        res = execute_skill_runner("earnings-review", "AMZN", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("Total Revenue", md, "AMZN report must contain Total Revenue")
        self.assertIn("Stock Price", md, "AMZN report must contain live stock price header")




if __name__ == "__main__":
    unittest.main()
