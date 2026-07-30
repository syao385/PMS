import unittest
from app.database import init_db, get_db_watchlist
from app.services.data_fetcher import fetch_latest_earnings_details
from app.services.skill_engine import execute_skill_runner

class TestNbisAndWatchlistIsolation(unittest.TestCase):

    def test_watchlist_contains_vrt_and_be(self):
        init_db()
        wl = get_db_watchlist()
        self.assertIn("VRT", wl, "Watchlist must contain VRT")
        self.assertIn("BE", wl, "Watchlist must contain BE")
        self.assertIn("NBIS", wl, "Watchlist must contain NBIS")

    def test_nbis_earnings_details_accuracy(self):
        info = fetch_latest_earnings_details("NBIS", "2026Q2")
        self.assertEqual(info["revenue_reported_m"], 145.20)
        self.assertEqual(info["eps_reported"], -0.12)
        self.assertEqual(info["period_ending_date"], "2026-06-30")
        self.assertIn("Nebius", info["verdict_summary"])

    def test_nbis_report_has_no_vrt_leakage(self):
        res = execute_skill_runner("earnings-review", "NBIS", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        # Check NBIS company name or ticker
        self.assertIn("NBIS", md)
        self.assertIn("$145.20M", md, "Section 2.1 must report NBIS revenue $145.20M")
        
        # Ensure NO VRT specific text leaks into NBIS report
        self.assertNotIn("Vertiv", md, "NBIS report should not mention Vertiv")
        self.assertNotIn("$2120.00M", md, "NBIS report should not contain VRT $2120M revenue")

if __name__ == "__main__":
    unittest.main()
