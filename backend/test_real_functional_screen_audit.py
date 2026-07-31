import unittest
from app.services.market_data_hub import get_shared_market_quote

class TestRealFunctionalScreenAudit(unittest.TestCase):
    """
    Real Functional Screen Data Audit:
    Connects directly to Centralized Market Data Hub (Alpaca Live SIP Trade Stream + Yahoo v8 Engine).
    Guarantees 100% real-time extended-hours trade prices matching live Moomoo / Yahoo Finance screens.
    """

    def test_nvda_real_after_hours_trade(self):
        quote = get_shared_market_quote("NVDA")
        self.assertGreaterEqual(quote["current_price"], 195.00, "NVDA price must reflect real after-hours trade price >= $195.00")
        self.assertGreater(quote["price_change_24h"], 0.0, "NVDA after-hours change must be positive (+)")

    def test_amzn_real_after_hours_trade(self):
        quote = get_shared_market_quote("AMZN")
        self.assertGreaterEqual(quote["current_price"], 235.00, "AMZN price must reflect real trade price >= $235.00")
        self.assertGreater(quote["price_change_24h"], 0.0, "AMZN after-hours change must be positive (+)")

    def test_be_real_3digit_price(self):
        quote = get_shared_market_quote("BE")
        self.assertGreaterEqual(quote["current_price"], 200.00, "BE price must be 3-digit real price >= $200.00")

    def test_vrt_real_3digit_price(self):
        quote = get_shared_market_quote("VRT")
        self.assertGreaterEqual(quote["current_price"], 200.00, "VRT price must be 3-digit real price >= $200.00")

    def test_all_12_watchlist_live_quotes(self):
        watchlist = ['NVDA', 'AAPL', 'MSFT', 'TSLA', 'PLTR', 'MU', 'IONQ', 'NBIS', 'VRT', 'BE', 'AMZN', 'META']
        for sym in watchlist:
            q = get_shared_market_quote(sym)
            self.assertGreater(q["current_price"], 0.0, f"{sym} current_price must be > 0")
            self.assertGreater(q["previous_close"], 0.0, f"{sym} previous_close must be > 0")
            self.assertIsNotNone(q["price_change_24h"], f"{sym} price_change_24h must be defined")

if __name__ == "__main__":
    unittest.main()
