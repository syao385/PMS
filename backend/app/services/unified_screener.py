"""
StockBee MAGNA Episodic Pivot & Quality Screener Engine.
Evaluates candidates across 5 MAGNA dimensions and fundamental quality factors.
"""

from typing import Dict, Any, List


def calculate_magna_score(
    gap_pct: float,
    rvol_ratio: float,
    earnings_surprise_pct: float,
    base_clearance: bool,
    hod_close_ratio: float
) -> Dict[str, Any]:
    """
    Computes StockBee MAGNA 5-Point Score (0-100 total).
    """
    # M: Momentum / Gap % (0-20)
    m_score = min(20, int(gap_pct / 15.0 * 20)) if gap_pct >= 8.0 else int(gap_pct / 8.0 * 10)

    # A: Acceleration / RVOL Ratio (0-20)
    a_score = min(20, int(rvol_ratio / 5.0 * 20)) if rvol_ratio >= 3.0 else int(rvol_ratio / 3.0 * 10)

    # G: Gap & Base Clearance (0-20)
    g_score = 20 if base_clearance else 10

    # N: News & Earnings Surprise (0-20)
    n_score = min(20, int(earnings_surprise_pct / 25.0 * 20)) if earnings_surprise_pct >= 15.0 else int(earnings_surprise_pct / 15.0 * 10)

    # A: Accumulation / HOD Close Ratio (0-20)
    acc_score = min(20, int(hod_close_ratio * 20)) if hod_close_ratio >= 0.85 else int(hod_close_ratio * 12)

    total_magna = m_score + a_score + g_score + n_score + acc_score

    verdict = "QUALIFIED EP 🟢" if total_magna >= 85 else ("QUALITY WATCH 🟡" if total_magna >= 60 else "REJECTED 🔴")

    return {
        "momentum_score": m_score,
        "acceleration_score": a_score,
        "gap_clearance_score": g_score,
        "news_catalyst_score": n_score,
        "accumulation_score": acc_score,
        "total_magna_score": total_magna,
        "verdict": verdict
    }
