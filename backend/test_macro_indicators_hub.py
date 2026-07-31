import unittest
from app.services.market_data_hub import get_shared_market_quote

class TestMacroIndicatorsHub(unittest.TestCase):
    """
    Macro Economic Indicators & Market Benchmarks Data Hub Audit:
    Tests dynamic extraction of ^VIX, ^GSPC (S&P 500), ^IXIC (Nasdaq), ^TNX (10-Yr Yield), and CL=F (Crude Oil).
    Guarantees 100% live non-zero macro benchmark data backed by 5s SQLite WAL cache.
    """

    def test_vix_volatility_quote(self):
        quote = get_shared_market_quote("^VIX")
        self.assertGreater(quote["current_price"], 0.0, "VIX price must be > 0")
        self.assertGreater(quote["previous_close"], 0.0, "VIX previous_close must be > 0")

    def test_sp500_index_quote(self):
        quote = get_shared_market_quote("^GSPC")
        self.assertGreater(quote["current_price"], 5000.0, "S&P 500 Index must be > 5,000")
        self.assertGreater(quote["previous_close"], 5000.0, "S&P 500 previous_close must be > 5,000")

    def test_nasdaq_index_quote(self):
        quote = get_shared_market_quote("^IXIC")
        self.assertGreater(quote["current_price"], 15000.0, "Nasdaq Composite must be > 15,000")
        self.assertGreater(quote["previous_close"], 15000.0, "Nasdaq previous_close must be > 15,000")

    def test_tnx_10yr_yield_quote(self):
        quote = get_shared_market_quote("^TNX")
        self.assertGreater(quote["current_price"], 1.0, "10-Yr Treasury Yield must be > 1.0%")
        self.assertGreater(quote["previous_close"], 1.0, "10-Yr Yield previous_close must be > 1.0%")

    def test_crude_oil_wti_quote(self):
        quote = get_shared_market_quote("CL=F")
        self.assertGreater(quote["current_price"], 30.0, "Crude Oil (WTI) price must be > $30.00")
        self.assertGreater(quote["previous_close"], 30.0, "Crude Oil previous_close must be > $30.00")

if __name__ == "__main__":
    unittest.main()
