import unittest
from app.services.data_fetcher import fetch_live_quote

class TestLiveQuotePipelineNoFakeData(unittest.TestCase):

    def test_arbitrary_tickers_live_quote_extraction(self):
        tickers = ["NVDA", "AAPL", "MSFT", "TSLA", "PLTR", "MU", "IONQ", "NBIS", "BE", "VRT", "AMZN", "META", "AMD", "GOOGL", "INTC", "QCOM", "SMCI", "ARM", "SBUX", "COIN"]
        
        for symbol in tickers:
            with self.subTest(symbol=symbol):
                quote = fetch_live_quote(symbol)
                self.assertGreater(quote["current_price"], 0.0, f"{symbol} current_price must be > 0")
                self.assertGreater(quote["previous_close"], 0.0, f"{symbol} previous_close must be > 0")
                self.assertIsNotNone(quote["price_change_24h"], f"{symbol} price_change_24h must not be None")
                
                # Formula integrity check: price_change_24h must equal ((price - prev_close)/prev_close)*100
                calc_chg = round(((quote["current_price"] - quote["previous_close"]) / quote["previous_close"]) * 100.0, 2)
                self.assertAlmostEqual(quote["price_change_24h"], calc_chg, delta=0.5, msg=f"{symbol} price_change_24h formula mismatch")

if __name__ == "__main__":
    unittest.main()
