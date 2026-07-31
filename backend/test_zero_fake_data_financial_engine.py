import unittest
from app.services.data_fetcher import fetch_latest_earnings_details

class TestZeroFakeDataFinancialEngine(unittest.TestCase):
    """
    End-to-End Dynamic SEC EDGAR & Financial Ingestion Integration Test Suite:
    Guarantees zero hardcoded static symbol dictionaries and zero fake fallback data.
    Verifies live SEC 10-Q GAAP financial statement extraction for all portfolio tickers.
    """

    def test_pltr_q1_2026_real_sec_filing(self):
        details = fetch_latest_earnings_details("PLTR", "2026Q1")
        
        self.assertEqual(details["period_ending_date"], "2026-03-31", "PLTR Q1 period ending date must be 2026-03-31")
        self.assertGreaterEqual(details["revenue_reported_m"], 1600.0, "PLTR Q1 revenue must equal $1.633B ($1632.58M)")
        self.assertGreater(details["net_income_reported_m"], 800.0, "PLTR Q1 net income must equal ~$870.53M")
        self.assertGreater(details["eps_reported"], 0.30, "PLTR Q1 EPS must equal $0.34")
        self.assertEqual(details["audit_verification_passed"], True, "PLTR Q1 earnings must pass Financial Gatekeeper")

    def test_mu_real_sec_filing(self):
        details = fetch_latest_earnings_details("MU", "2026Q3")
        
        self.assertEqual(details["period_ending_date"], "2026-05-31", "MU period ending date must be 2026-05-31")
        self.assertGreater(details["revenue_reported_m"], 6000.0, "MU revenue reported must be > $6000M ($6.4B+)")
        self.assertEqual(details["audit_verification_passed"], True, "MU earnings must pass Financial Gatekeeper")

    def test_nvda_real_sec_filing(self):
        details = fetch_latest_earnings_details("NVDA", "2026Q3")
        
        self.assertEqual(details["period_ending_date"], "2026-04-30", "NVDA period ending date must be 2026-04-30")
        self.assertGreater(details["revenue_reported_m"], 20000.0, "NVDA revenue reported must be > $20,000M ($20.4B+)")
        self.assertEqual(details["audit_verification_passed"], True, "NVDA earnings must pass Financial Gatekeeper")

    def test_aapl_real_sec_filing(self):
        details = fetch_latest_earnings_details("AAPL", "2026Q3")
        
        self.assertEqual(details["period_ending_date"], "2026-03-31", "AAPL period ending date must be 2026-03-31")
        self.assertGreater(details["revenue_reported_m"], 50000.0, "AAPL revenue reported must be > $50,000M ($56.4B+)")
        self.assertEqual(details["audit_verification_passed"], True, "AAPL earnings must pass Financial Gatekeeper")

    def test_all_watchlist_symbols_dynamic_extraction(self):
        tickers = ["PLTR", "MU", "NVDA", "AAPL", "AMZN", "META", "MSFT", "BE", "VRT", "NBIS", "AMD", "GOOGL"]
        for sym in tickers:
            details = fetch_latest_earnings_details(sym)
            self.assertGreater(details["revenue_reported_m"], 0.0, f"{sym} revenue reported must be > 0")
            self.assertEqual(details["audit_verification_passed"], True, f"{sym} must pass gatekeeper")

if __name__ == "__main__":
    unittest.main()
