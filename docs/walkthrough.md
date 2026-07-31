# TDD Walkthrough: Centralized Market Data Hub & Process Launcher Integration

## Launcher & Background Daemon Design (`run.bat`)

To ensure seamless background execution across **Institutional PMS**, **@GammaGexTrading**, **@MarketTerminal**, and **@QuantBackTestEngine**, we updated [run.bat](file:///c:/Users/jfan/Documents/institutional-pms/run.bat):

---

### 1. Unified Background Process Kickoff Strategy

- **Single Process Launcher (`run.bat`)**:
  - The Centralized Market Data Hub daemon initializes automatically inside the FastAPI Backend startup lifecycle (`@app.on_event("startup")`).
  - Running `run.bat` launches:
    1. **Python FastAPI Server & Centralized Market Data Hub** on `http://127.0.0.1:8090` (handles background cache updates, rate-limiting worker queue, and batch queries).
    2. **Vite React Web Dashboard** on `http://127.0.0.1:3000`.
    3. Automatically opens `http://127.0.0.1:3000/` in the default web browser.

---

### 2. Multi-Project Access Patterns

All 4 projects access the shared market data through 2 unified mechanisms:

1. **Direct SQLite WAL Connection (Fastest - Python to Python)**:
   - `QuantBackTestEngine`, `GammaGexTrading`, `MarketTerminal` import `market_data_hub.py` directly to read from `backend/institutional_pms.db` with WAL mode enabled (< 5ms latency).
2. **REST API Endpoint (`http://127.0.0.1:8090/api/market-quote?symbol=NVDA`)**:
   - Ideal for non-Python consumers or decoupled microservices.

---

### 3. Automated TDD Audit Suite Results
- `python test_market_data_hub_cache.py`: **3 / 3 PASSED 🟢**
- `python test_live_quote_pipeline_no_fake_data.py`: **1 / 1 PASSED 🟢 (20 Sub-tests OK)**
- `python test_financial_auditor_gatekeeper.py`: **3 / 3 PASSED 🟢**
- `python test_unreleased_and_db_purge.py`: **3 / 3 PASSED 🟢**
- `python test_comprehensive_system_audit.py`: **6 / 6 PASSED 🟢**
- `python test_dynamic_q4_matrix.py`: **2 / 2 PASSED 🟢**
- `python test_nbis_and_watchlist.py`: **3 / 3 PASSED 🟢**
- **Total Test Suite**: **21 / 21 PASSED 🟢** across all 7 test files.
- **GitHub Deployment**: Pushed commits `b2484be` and `47822d6` to [https://github.com/syao385/PMS.git](https://github.com/syao385/PMS.git).
