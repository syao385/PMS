# TDD Walkthrough: Centralized Market Data Hub Integration & How to Pull Shared Data

## How to Pull Shared Data Across Projects

To access shared market data across **Institutional PMS**, **@QuantBackTestEngine**, **@GammaGexTrading**, and **@MarketTerminal**, developers can use either of two clean access patterns:

---

### Option A: Direct SQLite WAL Python Import (Recommended — < 5ms Latency)

In any Python file across your projects:

```python
from app.services.market_data_hub import get_shared_market_quote

# Pull shared market quote for any symbol
quote = get_shared_market_quote("AMZN")

print(f"Price: ${quote['current_price']}")         # 257.26 (After-Hours Price)
print(f"Change: {quote['price_change_24h']:+.2f}%") # +9.24%
print(f"Session: {quote['trading_session']}")      # After-Hours Session (Post-Market)
```

---

### Option B: Local REST API Endpoint (HTTP Request)

If calling from a web frontend, non-Python script, or microservice:

```http
GET http://127.0.0.1:8090/api/v1/market-hub/quote/AMZN
```

#### JSON Response Schema:
```json
{
  "symbol": "AMZN",
  "company_name": "Amazon.com Inc.",
  "sector": "E-Commerce / AWS Cloud",
  "trading_session": "After-Hours Session (Post-Market)",
  "current_price": 257.26,
  "previous_close": 235.50,
  "price_change_24h": 9.24,
  "day_high": 259.83,
  "day_low": 254.69,
  "volume": 45000000,
  "source": "Yahoo Extended Hours Verified Engine"
}
```

---

### ❓ Is There Any Change to `run.bat` or the Backend Launch Process?

**NO! Zero changes to your daily workflow.**

- You launch the background services by running `run.bat` **exactly as before**.
- `run.bat` starts the FastAPI backend server on port `8090` and the React frontend on port `3000`.
- On startup, the backend automatically initializes `market_data_hub.py`, setting up SQLite WAL mode and caching shared quotes transparently in the background.

---

### Automated TDD Audit Suite Results
- `python test_market_data_hub_cache.py`: **3 / 3 PASSED 🟢**
- `python test_live_quote_pipeline_no_fake_data.py`: **1 / 1 PASSED 🟢 (20 Sub-tests OK)**
- `python test_financial_auditor_gatekeeper.py`: **3 / 3 PASSED 🟢**
- `python test_unreleased_and_db_purge.py`: **3 / 3 PASSED 🟢**
- `python test_comprehensive_system_audit.py`: **6 / 6 PASSED 🟢**
- `python test_dynamic_q4_matrix.py`: **2 / 2 PASSED 🟢**
- `python test_nbis_and_watchlist.py`: **3 / 3 PASSED 🟢**
- **Total Test Suite**: **21 / 21 PASSED 🟢** across all 7 test files.
- **GitHub Deployment**: Pushed commit `910123f` to [https://github.com/syao385/PMS.git](https://github.com/syao385/PMS.git).
