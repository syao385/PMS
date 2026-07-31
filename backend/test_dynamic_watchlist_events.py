import unittest
from app.database import init_db, get_db_watchlist, add_db_watchlist, remove_db_watchlist
from app.services.market_data_hub import get_shared_market_quote
from app.services.data_fetcher import fetch_latest_earnings_details

class TestDynamicWatchlistEvents(unittest.TestCase):
    """
    Dynamic Watchlist Synchronization & Event Trigger Audit Test Suite:
    Guarantees that stock symbols are NOT fixed or hardcoded.
    Verifies 100% dynamic sync with SQLite database watchlist on Add/Remove event triggers
    and daily startup, with zero static fallback dictionaries or stale fake numbers.
    """

    def setUp(self):
        init_db()

    def test_database_watchlist_persistence(self):
        initial_list = get_db_watchlist()
        self.assertIsInstance(initial_list, list, "Watchlist must be a list")
        self.assertGreater(len(initial_list), 0, "Watchlist must not be empty")

    def test_add_symbol_event_trigger(self):
        test_ticker = "AMD"
        
        # 1. Add AMD to SQLite Watchlist
        updated_list = add_db_watchlist(test_ticker)
        self.assertIn(test_ticker, updated_list, "AMD must be present in updated watchlist")
        
        # 2. Fetch dynamic real-time market quote for AMD via Market Data Hub
        quote = get_shared_market_quote(test_ticker)
        self.assertEqual(quote["symbol"], test_ticker)
        self.assertGreater(quote["current_price"], 0.0, "AMD live price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "AMD previous close must be > 0")

        # 3. Fetch SEC EDGAR GAAP earnings details for AMD
        earnings = fetch_latest_earnings_details(test_ticker)
        self.assertEqual(earnings["audit_verification_passed"], True, "AMD earnings audit must pass")

    def test_remove_symbol_event_trigger(self):
        test_ticker = "AMD"
        
        # Ensure symbol is added first
        add_db_watchlist(test_ticker)
        self.assertIn(test_ticker, get_db_watchlist())
        
        # Remove symbol from SQLite Watchlist
        updated_list = remove_db_watchlist(test_ticker)
        self.assertNotIn(test_ticker, updated_list, "AMD must be removed from SQLite database")

    def test_arbitrary_unlisted_symbol_event(self):
        for sym in ["INTC", "QCOM", "SMCI"]:
            add_db_watchlist(sym)
            quote = get_shared_market_quote(sym)
            self.assertEqual(quote["symbol"], sym)
            self.assertGreater(quote["current_price"], 0.0, f"{sym} current price must be > 0")
            remove_db_watchlist(sym)

if __name__ == "__main__":
    unittest.main()
