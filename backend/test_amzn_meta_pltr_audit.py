import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details

class TestMultiTickerAudit(unittest.TestCase):

    def test_amzn_moomoo_exact_figures(self):
        quote = fetch_live_quote("AMZN")
        self.assertEqual(quote["current_price"], 257.26, "AMZN extended-hours price must equal $257.26")
        self.assertEqual(quote["price_change_24h"], 9.24, "AMZN extended-hours price change % must equal +9.24%")

        details = fetch_latest_earnings_details("AMZN", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 151150.0, "AMZN revenue reported must equal $151.15B")
        self.assertEqual(details["revenue_surprise_pct"], 2.12, "AMZN revenue surprise % must equal +2.12%")
        self.assertEqual(details["eps_reported"], 1.26, "AMZN EPS reported must equal $1.26")
        self.assertEqual(details["eps_surprise_pct"], 213.49, "AMZN EPS surprise % must equal +213.49%")

    def test_meta_moomoo_exact_figures(self):
        quote = fetch_live_quote("META")
        self.assertEqual(quote["current_price"], 524.50, "META extended-hours price must equal $524.50")
        self.assertEqual(quote["price_change_24h"], 7.15, "META extended-hours price change % must equal +7.15%")

        details = fetch_latest_earnings_details("META", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 39070.0, "META revenue reported must equal $39.07B")
        self.assertEqual(details["revenue_surprise_pct"], 1.98, "META revenue surprise % must equal +1.98%")
        self.assertEqual(details["eps_reported"], 5.16, "META EPS reported must equal $5.16")
        self.assertEqual(details["eps_surprise_pct"], 9.79, "META EPS surprise % must equal +9.79%")

    def test_pltr_moomoo_exact_figures(self):
        quote = fetch_live_quote("PLTR")
        self.assertEqual(quote["current_price"], 28.40, "PLTR extended-hours price must equal $28.40")
        self.assertEqual(quote["price_change_24h"], 1.80, "PLTR extended-hours price change % must equal +1.80%")

        details = fetch_latest_earnings_details("PLTR", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 652.5, "PLTR revenue reported must equal $652.5M")
        self.assertEqual(details["revenue_surprise_pct"], 1.95, "PLTR revenue surprise % must equal +1.95%")
        self.assertEqual(details["eps_reported"], 0.09, "PLTR EPS reported must equal $0.09")
        self.assertEqual(details["eps_surprise_pct"], 12.50, "PLTR EPS surprise % must equal +12.50%")

if __name__ == "__main__":
    unittest.main()
