import unittest
from app.services.market_data_hub import fetch_gamma_gex_analytics

class TestGammaGexHub(unittest.TestCase):
    """
    Gamma Exposure (GEX) & Options Wall Audit Test Suite (@GammaGexTrading Integration):
    Tests real-time extraction of Put Wall, Call Wall, GEX Flip Level (Zero Gamma), Gamma Regime,
    and Center of Gravity Level for NVDA, AAPL, MSFT, AMZN, TSLA.
    """

    def test_nvda_gex_levels(self):
        res = fetch_gamma_gex_analytics("NVDA")
        self.assertEqual(res["symbol"], "NVDA")
        self.assertGreater(res["current_price"], 0.0, "NVDA price must be > 0")
        self.assertGreater(res["call_wall"], 0.0, "NVDA Call Wall must be > 0")
        self.assertGreater(res["put_wall"], 0.0, "NVDA Put Wall must be > 0")
        self.assertGreater(res["gex_flip_level"], 0.0, "NVDA GEX Flip Level must be > 0")
        self.assertGreater(res["center_of_gravity"], 0.0, "NVDA Center of Gravity must be > 0")
        self.assertIn("Gamma", res["gamma_regime"], "NVDA gamma_regime must contain Gamma description")

    def test_aapl_gex_levels(self):
        res = fetch_gamma_gex_analytics("AAPL")
        self.assertEqual(res["symbol"], "AAPL")
        self.assertGreater(res["call_wall"], 0.0, "AAPL Call Wall must be > 0")
        self.assertGreater(res["put_wall"], 0.0, "AAPL Put Wall must be > 0")

    def test_msft_gex_levels(self):
        res = fetch_gamma_gex_analytics("MSFT")
        self.assertEqual(res["symbol"], "MSFT")
        self.assertGreater(res["call_wall"], 0.0, "MSFT Call Wall must be > 0")

    def test_amzn_gex_levels(self):
        res = fetch_gamma_gex_analytics("AMZN")
        self.assertEqual(res["symbol"], "AMZN")
        self.assertGreater(res["put_wall"], 0.0, "AMZN Put Wall must be > 0")

if __name__ == "__main__":
    unittest.main()
