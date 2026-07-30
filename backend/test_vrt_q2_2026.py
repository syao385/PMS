import unittest
import json
from app.services.skill_engine import execute_skill_runner
from app.services.data_fetcher import fetch_latest_earnings_details

class TestVrtQ22026Earnings(unittest.TestCase):

    def test_vrt_q2_2026_data_accuracy(self):
        earn_info = fetch_latest_earnings_details("VRT", "2026Q2")
        self.assertEqual(earn_info["quarter_name"], "2026Q2")
        self.assertEqual(earn_info["period_ending_date"], "2026-06-30")
        self.assertEqual(earn_info["revenue_reported_m"], 2120.0)
        self.assertEqual(earn_info["revenue_surprise_pct"], -3.10)
        self.assertEqual(earn_info["eps_reported"], 0.93)
        self.assertEqual(earn_info["eps_surprise_pct"], 6.87)

    def test_vrt_q2_2026_report_markdown_content(self):
        res = execute_skill_runner("earnings-review", "VRT", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        # Must show Total Revenue $2,120.00M and Revenue Miss in Section 2.1
        self.assertIn("$2120.00M", md, "Section 2.1 table should display $2120.00M reported revenue")
        self.assertIn("低于卖方共识", md, "Section 2.1 table should show revenue below consensus")

        # Must show EPS reported $0.93
        self.assertIn("0.93", md, "Section 2.1 should display reported EPS $0.93")
        # Must show Receivables warning 🔴
        self.assertIn("🔴 警示", md, "Section 4.2 should flag Receivables > Revenue warning")
        # Must show Thesis Weakened 🔴
        self.assertIn("削弱", md, "Section 6.2 should downgrade thesis stance to Weakened")

if __name__ == "__main__":
    unittest.main()
