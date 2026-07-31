import unittest
from app.services.skill_engine import execute_skill_runner

class TestDynamicQuestion4Matrix(unittest.TestCase):

    def test_vrt_q4_strategy_matrix_miss_stance(self):
        res = execute_skill_runner("earnings-review", "VRT", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("VRT", md, "VRT report must include VRT ticker")
        self.assertIn("Question 4", md, "VRT report must answer Question 4 decision")


    def test_nbis_q4_strategy_matrix_beat_stance(self):
        res = execute_skill_runner("earnings-review", "NBIS", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("NBIS", md, "NBIS report must include NBIS title")
        self.assertIn("积极加仓 / 坚定持有", md, "NBIS Question 4 instruction must be Buy / Accumulate")


if __name__ == "__main__":
    unittest.main()
