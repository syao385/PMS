"""
Financial Rigor Validation Module using Python decimal.Decimal.
Eliminates LLM arithmetic hallucinations and verifies exact financial calculations.
"""

from decimal import Decimal, ROUND_HALF_UP
from typing import Dict, Any, Tuple


def to_decimal(val: Any) -> Decimal:
    if isinstance(val, Decimal):
        return val
    try:
        return Decimal(str(val))
    except Exception:
        return Decimal('0')


def verify_market_cap(share_price: float, shares_outstanding: float, reported_market_cap: float) -> Tuple[bool, float, str]:
    """
    Verifies reported market cap against exact decimal product of share price * shares outstanding.
    """
    price_dec = to_decimal(share_price)
    shares_dec = to_decimal(shares_outstanding)
    reported_dec = to_decimal(reported_market_cap)

    calculated_cap = price_dec * shares_dec

    if reported_dec == Decimal('0'):
        return True, 0.0, f"${calculated_cap:,.2f}"

    discrepancy_pct = abs((calculated_cap - reported_dec) / reported_dec) * Decimal('100')
    discrepancy_float = float(discrepancy_pct.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))
    
    passed = discrepancy_float <= 0.5
    formatted_calc = f"${calculated_cap:,.2f}"

    return passed, discrepancy_float, formatted_calc


def verify_pe_ratio(share_price: float, eps: float, reported_pe: float) -> Tuple[bool, float, str]:
    """
    Verifies reported P/E ratio against Share Price / TTM EPS using decimal.Decimal.
    """
    if eps <= 0:
        return True, 0.0, "N/A (Negative EPS)"

    price_dec = to_decimal(share_price)
    eps_dec = to_decimal(eps)
    reported_dec = to_decimal(reported_pe)

    calculated_pe = price_dec / eps_dec
    discrepancy_pct = abs((calculated_pe - reported_dec) / reported_dec) * Decimal('100') if reported_dec > 0 else Decimal('0')
    discrepancy_float = float(discrepancy_pct.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))

    passed = discrepancy_float <= 1.0
    formatted_calc = f"{calculated_pe:.2f}x"

    return passed, discrepancy_float, formatted_calc
