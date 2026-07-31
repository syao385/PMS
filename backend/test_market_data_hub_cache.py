import unittest
import time
from app.database import init_db
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details

class TestMarketDataHubCache(unittest.TestCase):

    def setUp(self):
        init_db()

    def test_watchlist_batch_quote_consistency(self):
        tickers = ['NVDA', 'AAPL', 'MSFT', 'TSLA', 'PLTR', 'MU', 'IONQ', 'NBIS', 'VRT', 'BE', 'AMZN', 'META']
        quotes = {t: fetch_live_quote(t) for t in tickers}
        
        for ticker in tickers:
            q = quotes[ticker]
            self.assertIn("current_price", q, f"{ticker} must contain current_price")
            self.assertGreater(q["current_price"], 0.0, f"{ticker} current_price must be > 0")
            self.assertIn("previous_close", q, f"{ticker} must contain previous_close")
            self.assertGreater(q["previous_close"], 0.0, f"{ticker} previous_close must be > 0")
            self.assertIn("price_change_24h", q, f"{ticker} must contain price_change_24h")

        # Verify dynamic live quote extraction across all watchlist symbols
        self.assertGreater(quotes["BE"]["current_price"], 0.0, "BE current_price must be > 0")
        self.assertGreater(quotes["VRT"]["current_price"], 0.0, "VRT current_price must be > 0")
        self.assertGreater(quotes["NBIS"]["current_price"], 0.0, "NBIS current_price must be > 0")
        self.assertGreater(quotes["AMZN"]["current_price"], 0.0, "AMZN current_price must be > 0")
        self.assertGreater(quotes["META"]["current_price"], 0.0, "META current_price must be > 0")
        self.assertGreater(quotes["AAPL"]["current_price"], 0.0, "AAPL current_price must be > 0")
        self.assertGreater(quotes["PLTR"]["current_price"], 0.0, "PLTR current_price must be > 0")



    def test_cache_hit_speed(self):
        # Warm up cache first
        q1 = fetch_live_quote("AMZN")
        
        start = time.time()
        # Immediate repeated call within 5s TTL window (Pure SQLite Cache Hit)
        q2 = fetch_live_quote("AMZN")
        elapsed = time.time() - start
        
        self.assertEqual(q1["current_price"], q2["current_price"])
        self.assertLess(elapsed, 0.10, "Cached quote fetch must complete in < 100ms")


    def test_cross_project_amzn_earnings_consistency(self):
        details = fetch_latest_earnings_details("AMZN", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 60800.0)
        self.assertEqual(details["net_income_reported_m"], 15840.0)
        self.assertEqual(details["net_income_consensus_m"], 18780.0)
        self.assertEqual(details["eps_reported"], 1.26)

if __name__ == "__main__":
    unittest.main()
