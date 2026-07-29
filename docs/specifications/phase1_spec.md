# Software Specification Document: Phase 1 Qualitative AI Research & Universal Scanner Engine

**System:** Institutional Stocks & ETFs Portfolio Management System (`institutional-pms`)  
**Module:** Phase 1 — Qualitative AI Research, Sector-Adaptive Valuation & StockBee MAGNA Universal Scanner  
**Version:** 1.5.0  
**Status:** Approved for Full Production Implementation  
**Author:** Antigravity AI  

---

## 1. Executive Summary & Scope

Phase 1 delivers the **Qualitative AI Research Engine**, **Sector-Adaptive Intrinsic Valuation Model**, and **Unified StockBee MAGNA Universal Scanner** for `institutional-pms`. It adapts value investing principles from `xbtlin/ai-berkshire`, catalyst momentum methodologies from StockBee, and technical analysis from TradingView into a production-grade Python FastAPI backend powered by **Google Gemini 3.6 Pro/Flash**, rendered via a **MarketTerminal 3-Panel React Web Interface**.

### Key Deliverables in Phase 1:
1. **Multi-Agent 4-Master AI Engine:** Automated execution of Warren Buffett, Charlie Munger, Duan Yongping, and Li Lu investment prompts, synthesizing structured research memos.
2. **Sector-Adaptive Intrinsic Valuation Engine:** Sector-specific valuation routing:
   * *High-Growth Tech / SaaS:* SBC-Adjusted Free Cash Flow & Rule of 40.
   * *Cyclicals & Industrials:* Normalized Mid-Cycle Earnings & EV/IC.
   * *Value & Financials:* Dividend Discount Model (DDM) & ROE vs. $Ke$.
3. **StockBee MAGNA 5-Point Earnings Play Engine:** Evaluates post-earnings Episodic Pivots across **M**omentum ($\ge 8\%$ gap), **A**cceleration ($\ge 3.0\times$ RVOL), **G**ap clearance, **N**ews surprise ($\ge 15\%$), and **A**ccumulation (HOD close ratio $\ge 85\%$).
4. **Merged Universal Scanner:** Single unified scanner merging Fundamental Quality criteria (ROIC $\ge 15\%$, Moat $\ge 4.0$) with StockBee MAGNA EP triggers.
5. **Embedded TradingView Technical Chart Panel (`tradingview-mcp`):** Real-time interactive chart panel embedded inside the Universal Scanner page.
6. **Financial Rigor Validation Module (`decimal.Decimal`):** Zero-hallucination arithmetic audit eliminating LLM math errors.
7. **MarketTerminal 3-Panel React UI:** 
   * *Left Panel:* Scrollable Watchlist table, Top In-Play AI Candidates, Trade Execution Ticket.
   * *Center Panel:* Ticker Quote Header, Tab Switcher (Research, Scanner, Compare, Drift, Pulse, Journal).
   * *Right Panel:* Multi-Feed News Portal (WSJ, CNBC, Google News), Volatility & Sentiment Split progress bars, Macro Economic Board.

---

## 2. Functional Requirements

### FR-1: Multi-Agent Fundamental Research Engine (`/api/v1/research/analyze`)
* **FR-1.1 Inputs:** `ticker` (US Stock/ETF), `benchmark` (default `SPY`), `horizon_years` (default 5).
* **FR-1.2 Data Aggregation:** Fetches SEC 10-K/10-Q filings, fundamental metrics (`yfinance`), and news feeds.
* **FR-1.3 4-Master Evaluation:**
  * **Duan Yongping:** Business essence and simplicity ("Stop Doing List").
  * **Warren Buffett:** Economic moat, pricing power, and toll-bridge model.
  * **Charlie Munger:** Inversion and failure mode analysis.
  * **Li Lu:** Secular 10-year megatrends and management integrity.
* **FR-1.4 Mirror Test:** 5-sentence summary thesis clarity check.

### FR-2: Sector-Adaptive Intrinsic Valuation Solver
* Automatically applies GICS sector-specific valuation logic:
  $$\text{SBC-Adjusted FCF} = \text{Operating Cash Flow} - \text{CapEx} - \text{Stock-Based Compensation}$$
  $$\text{Rule of 40} = \text{YoY Revenue Growth \%} + \text{FCF Margin \%}$$
* Probability-weighted Monte Carlo intrinsic value: Bear (25%), Base (50%), Bull (25%).

### FR-3: StockBee MAGNA Universal Scanner (`/api/v1/screener/universal`)
* Evaluates tickers against 5 MAGNA dimensions (Total MAGNA Score 0–100):
  * **M — Momentum / Movement** (0–20 pts): Opening price gap $\ge 8.0\%$.
  * **A — Acceleration / Volume** (0–20 pts): Relative Volume $\text{RVOL} \ge 3.0\times$.
  * **G — Gap & Base Clearance** (0–20 pts): Breakout clearing multi-week consolidation without overhead supply.
  * **N — News & Earnings Surprise** (0–20 pts): Earnings surprise $\ge +15.0\%$ & margin expansion.
  * **A — Accumulation & Order Flow** (0–20 pts): High-of-Day close ratio $\ge 0.85$.

### FR-4: Financial Rigor & Decimal Verification
* Pre-flight arithmetic verification using Python `decimal.Decimal`.
* Flags discrepancy warning if calculated vs. reported market cap exceeds 0.5%.

### FR-5: Watchlist CRUD & Portfolio Ledger (`/api/v1/watchlist`)
* Full symbol Add/Remove state persistence and position ledger logging (`实盘记录`).

---

## 3. System Architecture & Technical Specifications

```text
POST /api/v1/research/analyze
POST /api/v1/screener/universal
GET  /api/v1/watchlist
POST /api/v1/watchlist/add
DELETE /api/v1/watchlist/remove/{ticker}
POST /api/v1/journal/log
```

### Database Schema (`institutional_pms.db`)
```sql
CREATE TABLE IF NOT EXISTS watchlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker VARCHAR(12) UNIQUE NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_memos (
    id VARCHAR(64) PRIMARY KEY,
    ticker VARCHAR(12) NOT NULL,
    company_name VARCHAR(128) NOT NULL,
    overall_score NUMERIC(3,2) NOT NULL,
    mirror_test_passed BOOLEAN NOT NULL,
    base_target NUMERIC(12,2),
    margin_of_safety_pct NUMERIC(5,2),
    markdown_content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trade_journal (
    id VARCHAR(64) PRIMARY KEY,
    date VARCHAR(20) NOT NULL,
    ticker VARCHAR(12) NOT NULL,
    action VARCHAR(10) NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    shares NUMERIC(12,2) NOT NULL,
    conviction_score NUMERIC(3,2),
    thesis_summary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Verification & Testing Matrix

1. **Backend Integration Tests:** PyTest execution of sector valuation math, decimal rigor audits, and MAGNA score calculations.
2. **Frontend 3-Panel Layout Test:** React rendering of Left Panel (Watchlist + Trading), Center Panel (Quote Header + Active Views), and Right Panel (News Portal + Volatility/Sentiment/Macro).
3. **End-to-End Workflow Verification:** Ticker selection in Watchlist triggering dynamic updates across all 3 panels and embedded TradingView technical chart.
