import unittest
from app.services.data_fetcher import fetch_latest_earnings_details, validate_earnings_financial_rigor
from app.services.skill_engine import execute_skill_runner

class TestFinancialAuditorGatekeeper(unittest.TestCase):

    def test_gatekeeper_blocks_corrupted_payload(self):
        # Mismatched revenue surprise (Reported $100 vs Consensus $50 should be +100%, but surprise passed as +10%)
        corrupted_payload = {
            "is_released": True,
            "revenue_reported_m": 100.0,
            "revenue_consensus_m": 50.0,
            "revenue_surprise_pct": 10.0,  # Corrupted! Should be +100.0%
            "net_income_reported_m": 20.0,
            "net_income_consensus_m": 20.0,
            "net_income_surprise_pct": 0.0,
            "eps_reported": 1.0,
            "eps_consensus": 1.0,
            "eps_surprise_pct": 0.0
        }
        with self.assertRaises(ValueError, msg="Gatekeeper must raise ValueError on corrupted payload"):
            validate_earnings_financial_rigor(corrupted_payload)

    def test_gatekeeper_approves_valid_amzn_payload(self):
        details = fetch_latest_earnings_details("AMZN", "2026Q2")
        self.assertTrue(details.get("audit_verification_passed"), "AMZN details must pass gatekeeper mathematical verification")
        self.assertGreater(details["revenue_reported_m"], 0.0, "AMZN GAAP Revenue must be > 0")

    def test_step8_report_contains_gatekeeper_badge(self):
        res = execute_skill_runner("earnings-review", "AMZN", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        self.assertIn("Financial Data Audit Trail & Pre-Save Verification Gatekeeper", md)
        self.assertIn("VERIFIED PASSED 🟢", md)


if __name__ == "__main__":
    unittest.main()
