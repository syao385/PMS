import unittest
from app.services.skill_engine import execute_skill_runner

class TestDynamicQuestion4Matrix(unittest.TestCase):

    def test_vrt_q4_strategy_matrix_miss_stance(self):
        res = execute_skill_runner("earnings-review", "VRT", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("VRT - 论文削弱/减仓防守", md, "VRT matrix title must reflect thesis weakening")
        self.assertIn("暂缓加仓 / 分步减仓", md, "VRT Question 4 instruction must be Hold / Staged Trimming")
        self.assertIn("绝不徒手接飞刀", md, "VRT short-term strategy must enforce defensive stance")

    def test_nbis_q4_strategy_matrix_beat_stance(self):
        res = execute_skill_runner("earnings-review", "NBIS", params={"quarter": "2026Q2"}, force_refresh=True)
        md = res["report_markdown"]
        
        self.assertIn("NBIS - 论文强化/加仓买入", md, "NBIS matrix title must reflect thesis reinforcement")
        self.assertIn("积极加仓 / 坚定持有", md, "NBIS Question 4 instruction must be Buy / Accumulate")
        self.assertIn("顺势加仓与动量追踪", md, "NBIS short-term strategy must enforce momentum accumulation")

if __name__ == "__main__":
    unittest.main()
