import unittest
from app.services.data_fetcher import fetch_live_quote, fetch_latest_earnings_details, fetch_live_news

class TestAMZNQuarterlyAudit(unittest.TestCase):

    def test_amzn_live_quote_extended_hours_programmatic(self):
        quote = fetch_live_quote("AMZN")
        self.assertEqual(quote["symbol"], "AMZN")
        self.assertEqual(quote["current_price"], 170.80, "AMZN price must equal after-hours price $170.80")
        self.assertEqual(quote["previous_close"], 184.00, "AMZN previous close must equal $184.00")
        self.assertEqual(quote["price_change_24h"], -7.17, "AMZN price change % must equal -7.17%")

    def test_amzn_q2_2026_earnings_details(self):
        details = fetch_latest_earnings_details("AMZN", "2026Q2")
        self.assertEqual(details["revenue_reported_m"], 148000.0, "AMZN reported revenue must equal $148,000.0M ($148.0B)")
        self.assertEqual(details["revenue_surprise_pct"], -0.34, "AMZN revenue surprise must equal -0.34%")
        self.assertEqual(details["eps_reported"], 1.26, "AMZN reported EPS must equal $1.26")
        self.assertEqual(details["eps_surprise_pct"], 23.53, "AMZN EPS surprise must equal +23.53%")

    def test_news_sources_do_not_contain_sec_edgar(self):
        news = fetch_live_news("AMZN", count=10)
        self.assertGreaterEqual(len(news), 10, "Must return at least 10 news items")
        for item in news:
            self.assertNotIn("SEC EDGAR", item["source"], "News source must not be SEC EDGAR")

if __name__ == "__main__":
    unittest.main()
