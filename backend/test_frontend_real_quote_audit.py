import unittest
from app.services.data_fetcher import fetch_live_quote
from app.services.market_data_hub import get_shared_market_quote

class TestFrontendRealQuoteAudit(unittest.TestCase):
    """
    Direct REST & Service End-to-End Functional Screen Test:
    Validates that the API endpoint served to the React Frontend UI displays exact live extended-hours numbers.
    """

    def test_nvda_frontend_quote_alignment(self):
        quote = fetch_live_quote("NVDA")
        self.assertEqual(quote["symbol"], "NVDA")
        self.assertGreaterEqual(quote["current_price"], 195.00, "NVDA price must be real trade price >= $195.00")
        self.assertEqual(quote["previous_close"], 195.04, "NVDA reference close must equal Today's 4:00 PM Regular Close ($195.04)")
        self.assertGreater(quote["price_change_24h"], 0.0, "NVDA After-Hours % Change must be POSITIVE (+)")
        self.assertEqual(quote["trading_session"], "After-Hours Session (Post-Market)")

    def test_amzn_frontend_quote_alignment(self):
        quote = fetch_live_quote("AMZN")
        self.assertEqual(quote["symbol"], "AMZN")
        self.assertGreaterEqual(quote["current_price"], 235.00)
        self.assertGreaterEqual(quote["previous_close"], 235.00)
        self.assertGreater(quote["price_change_24h"], 0.0)


if __name__ == "__main__":
    unittest.main()
