import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details
from app.services.skill_engine import execute_skill_runner
from clear_and_reseed_db import clear_and_reseed

class TestUnreleasedQuarterAndDbPurge(unittest.TestCase):

    def setUp(self):
        # Purge stale DB entries before each test
        clear_and_reseed()

    def test_pltr_unreleased_q2_handling(self):
        # PLTR 2026Q2 is scheduled for Aug 3, 2026 (Unreleased)
        details = fetch_latest_earnings_details("PLTR", "2026Q2")
        self.assertFalse(details["is_released"], "PLTR 2026Q2 must be marked as is_released: False")
        
        res = execute_skill_runner("earnings-review", "PLTR", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        self.assertIn("财报尚未发布", md, "Report must display Pending Release warning banner")
        self.assertIn("2026-08-03", md, "Report must display scheduled release date 2026-08-03")

    def test_pltr_released_q1_historical_backload(self):
        # PLTR 2026Q1 was released May 4, 2026
        details = fetch_latest_earnings_details("PLTR", "2026Q1")
        self.assertTrue(details["is_released"], "PLTR 2026Q1 must be marked as is_released: True")
        self.assertEqual(details["revenue_surprise_pct"], 5.85, "PLTR Q1 revenue surprise must equal +5.85%")
        self.assertEqual(details["eps_surprise_pct"], 18.96, "PLTR Q1 EPS surprise must equal +18.96%")

    def test_amzn_exact_moomoo_report_generation(self):
        res = execute_skill_runner("earnings-review", "AMZN", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("4.17%", md, "AMZN report must contain exact revenue beat +4.17%")
        self.assertIn("6.38%", md, "AMZN report must contain exact EPS beat +6.38%")
        self.assertIn("257.26", md, "AMZN report must contain exact live extended hours price $257.26")
        self.assertIn("9.24%", md, "AMZN report must contain exact extended hours surge +9.24%")

if __name__ == "__main__":
    unittest.main()
