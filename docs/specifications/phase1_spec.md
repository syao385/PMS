# Software Specification Document: Phase 1 Qualitative AI Research Engine

**System:** Institutional Stocks & ETFs Portfolio Management System (`institutional-pms`)  
**Module:** Phase 1 — Qualitative AI Research & Investment Memo Engine  
**Version:** 1.0.0  
**Status:** Approved for Development  
**Author:** Antigravity AI  

---

## 1. Executive Summary & Scope

Phase 1 delivers the **Qualitative AI Research & Memo Engine** for `institutional-pms`. It adapts and automates the value investing methodologies from `xbtlin/ai-berkshire` into a production-grade Python FastAPI backend powered by **Google Gemini 3.6 Flash / Pro**, exposed via a modern **React Web Dashboard**.

### Key Deliverables in Phase 1:
1. **Data Collection Pipeline:** Automated ingestion of US Equities & ETFs price data, fundamental financial metrics (`yfinance`), and SEC 10-K/10-Q filings (`sec-edgar-downloader`).
2. **Multi-Agent 4-Master AI Engine:** Automated execution of Buffett, Munger, Duan Yongping, and Li Lu investment perspective prompts, synthesizing a final investment research memo.
3. **Financial Rigor Validation Module:** Adaption of Python `tools/financial_rigor.py` using `decimal.Decimal` to eliminate LLM arithmetic hallucinations (market cap, EV/EBITDA, P/E ratios).
4. **Thesis Drift Tracker & News Pulse:** Automated monitoring of thesis changes over time and rapid 10-minute price movement attribution.
5. **Interactive Research Dashboard (React):** Web interface for querying tickers, viewing score cards, reading structured markdown memos, and comparing historical thesis updates.

---

## 2. Functional Requirements

### FR-1: Multi-Agent Fundamental Research Engine (`/investment-research`)
* **FR-1.1 Input Parameters:**
  * `ticker` (string, required): Valid US Stock or ETF symbol (e.g., `AAPL`, `NVDA`, `QQQ`).
  * `benchmark` (string, optional, default: `SPY`): Benchmark index for relative analysis.
  * `horizon_years` (integer, default: 5): Investment time horizon.
* **FR-1.2 Data Aggregation Step:**
  * System fetches key stats: Market Cap, Enterprise Value, P/E, P/B, EV/EBITDA, Free Cash Flow, Debt/Equity, Revenue Growth (3yr CAGR), ROIC.
  * System fetches recent SEC filings (Latest 10-K and 10-Q summaries).
* **FR-1.3 Multi-Agent Synthesis Execution:**
  * **Agent 1 (Duan Yongping - Business Essence):** Analyzes business model, unit economics, and simplicity ("Do I understand it?").
  * **Agent 2 (Warren Buffett - Economic Moat):** Evaluates pricing power, network effects, switching costs, and capital allocation efficiency.
  * **Agent 3 (Charlie Munger - Inversion & Risk):** Red-teams the investment ("How could this business die? What are the blind spots?").
  * **Agent 4 (Li Lu - Secular Trends):** Evaluates 10-year macro trajectory and management integrity.
  * **Team Lead Synthesis:** Aggregates findings, computes weighted score (1.0 to 5.0), defines 3-scenario valuation (Bull / Base / Bear), and tests the **Mirror Test** (5-sentence thesis check).
* **FR-1.4 Output Specification:**
  * Returns JSON payload containing:
    * `master_scores`: `{ duan: float, buffett: float, munger: float, lilu: float, overall: float }`
    * `mirror_test`: `{ passed: boolean, summary: string }`
    * `valuation`: `{ bull_target: float, base_target: float, bear_target: float, margin_of_safety_pct: float }`
    * `markdown_memo`: Full markdown report string following standardized institutional template.

### FR-2: Financial Rigor & Mathematical Validation
* **FR-2.1 Exact Decimal Verification:**
  * Math verification function executes before memo publication:
    $$\text{Calculated Market Cap} = \text{Share Price} \times \text{Shares Outstanding}$$
  * If discrepancy between reported and calculated market cap exceeds 0.5%, the system flag `data_warning` with exact decimal discrepancies.
  * All financial calculations inside backend use `decimal.Decimal` (never floating point).

### FR-3: Thesis Drift & Earnings Review (`/thesis-drift`)
* **FR-3.1 Delta Analysis:**
  * Input: `ticker`, `previous_memo_id`, `new_filing_text` / `earnings_transcript`.
  * Evaluates changes in: Moat score, revenue guidance, margin trends, management commentary.
  * Returns classification: `INTACT` 🟢 | `DRIFTING` 🟡 | `BROKEN` 🔴 with detailed bullet points.

### FR-4: News Pulse & Price Attribution (`/news-pulse`)
* **FR-4.1 Rapid Movement Attribution:**
  * Input: `ticker`, `price_change_pct` (e.g., `-8.5%`), `timeframe` (e.g., `7d`).
  * Execution: Fetches news articles, SEC Form 4 insider trades, and sector beta movement.
  * Returns attribution breakdown: Fundamental Event (%), Sentiment/Liquidity (%), Unknown/Rumor (%).

---

## 3. Technical & API Specifications

### Backend Service API Endpoints (FastAPI)

```text
POST /api/v1/research/analyze
Request Body:
{
  "ticker": "NVDA",
  "benchmark": "SPY",
  "horizon_years": 5,
  "force_refresh": false
}

Response (200 OK):
{
  "request_id": "req_98765",
  "ticker": "NVDA",
  "company_name": "NVIDIA Corporation",
  "created_at": "2026-07-25T11:58:00Z",
  "master_scores": {
    "duan": 4.5,
    "buffett": 4.8,
    "munger": 3.9,
    "lilu": 4.6,
    "overall": 4.45
  },
  "mirror_test": {
    "passed": true,
    "summary": "NVIDIA dominates GPU accelerated computing infrastructure with a deep CUDA moat."
  },
  "valuation": {
    "currency": "USD",
    "current_price": 125.50,
    "bear_target": 95.00,
    "base_target": 140.00,
    "bull_target": 180.00,
    "margin_of_safety_pct": 11.5
  },
  "markdown_memo_url": "/api/v1/research/memos/req_98765.md"
}
```

```text
POST /api/v1/research/thesis-drift
GET  /api/v1/research/history/{ticker}
POST /api/v1/research/news-pulse
```

---

## 4. Database Schema (SQLite / PostgreSQL)

### `research_memos` Table
```sql
CREATE TABLE research_memos (
    id VARCHAR(64) PRIMARY KEY,
    ticker VARCHAR(12) NOT NULL,
    company_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    overall_score NUMERIC(3,2) NOT NULL,
    duan_score NUMERIC(3,2),
    buffett_score NUMERIC(3,2),
    munger_score NUMERIC(3,2),
    lilu_score NUMERIC(3,2),
    mirror_test_passed BOOLEAN NOT NULL,
    mirror_test_summary TEXT,
    bull_target NUMERIC(12,2),
    base_target NUMERIC(12,2),
    bear_target NUMERIC(12,2),
    markdown_content TEXT NOT NULL,
    data_snapshot JSONB
);
CREATE INDEX idx_memos_ticker ON research_memos(ticker);
```

---

## 5. UI / UX Design Specifications

### Page Component Layout (`frontend/src/pages/ResearchMemoPage.jsx`)
1. **Header & Search Bar:** Symbol search input with autocomplete suggestions for US stocks and ETFs.
2. **Key Financial Bar:** Ticker symbol, company name, current price, P/E, Market Cap, 52-week range.
3. **Master Scores Badge Row:** 4 distinct visual cards for Duan Yongping, Buffett, Munger, and Li Lu scores with color badges (Green $\ge 4.0$, Yellow $3.0-3.9$, Red $<3.0$).
4. **Mirror Test Banner:** Alert banner highlighting the 5-sentence thesis statement and Pass/Fail status.
5. **Interactive Markdown Reader:** Rendered investment memo with table of contents, copy-to-clipboard, export-to-PDF, and key takeaways tabs.

---

## 6. Verification & Test Plan

### Automated Test Matrix
1. **Data Ingestion Test:** Verify `yfinance` fetcher correctly retrieves balance sheet and cash flow numbers for tickers `AAPL`, `MSFT`, `SPY`.
2. **Decimal Rigor Test:** Execute `verify_market_cap` test suite with edge cases (e.g., market cap unit differences, stock splits).
3. **Gemini API Integration Test:** Mock and live test calls to Gemini 3.6 API validating JSON output structure and markdown formatting.
4. **FastAPI Endpoints Test:** Test `POST /api/v1/research/analyze` using PyTest and FastAPI `TestClient`.

---

## 7. Approval & Sign-Off
- **Status:** Approved for Implementation in Phase 1.
