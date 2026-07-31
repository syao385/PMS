# Institutional PMS Architecture, Design Specifications & Database Schema

## 🏛️ System Overview

The **Institutional Portfolio Management & Earnings Analysis System (PMS)** is a multi-tier, zero-fake-data quantitative architecture designed for real-time portfolio tracking, primary SEC EDGAR 10-Q filing ingestion, 4-Master Value Framework research, and institutional 3-Horizon trading guidance.

---

## 📡 1. Real-Time Market & Extended-Hours Price Data Pipeline

### 1.1 Ingestion Flow & Fallback Hierarchy

To guarantee sub-15 minute latency and accurate prices during regular, premarket, and after-hours trading sessions:

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               REAL-TIME MARKET PRICE INGESTION                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                  ┌─────────────────────────────────────────────────────────────┐
                  │ Layer 1: yfinance Extended Hours (fast_info / postMarket)    │
                  └─────────────────────────────────────────────────────────────┘
                                                 │
                                       (If Rate Limited 429)
                                                 │
                                                 ▼
                  ┌─────────────────────────────────────────────────────────────┐
                  │ Layer 2: Alpaca IEX Real-Time Data API                      │
                  └─────────────────────────────────────────────────────────────┘
                                                 │
                                       (If Market Closed AH)
                                                 │
                                                 ▼
                  ┌─────────────────────────────────────────────────────────────┐
                  │ Layer 3: Extended-Hours Quote Matcher ($313.30 AH / -6.08%) │
                  └─────────────────────────────────────────────────────────────┘
```

### 1.2 After-Hours Price & % Change Calculation Formula

When market session is in **After-Hours (AH)** or **Premarket (PM)**:

$$\text{Price}_{\text{Live}} = \begin{cases} P_{\text{postMarket}}, & \text{if After-Hours Session} \\ P_{\text{preMarket}}, & \text{if Premarket Session} \\ P_{\text{lastRegular}}, & \text{if Regular Market Session} \end{cases}$$

$$\Delta\%_{\text{Change}} = \left( \frac{\text{Price}_{\text{Live}} - P_{\text{PreviousClose}}}{P_{\text{PreviousClose}}} \right) \times 100\%$$

*For Apple Inc. (AAPL) Q3 2026 Extended Hours:*
- $\text{Price}_{\text{Live}} = \$313.30$
- $P_{\text{PreviousClose}} = \$333.58$
- $\Delta\%_{\text{Change}} = \frac{313.30 - 333.58}{333.58} \times 100\% = -6.08\%$

---

## 📄 2. Primary SEC EDGAR 10-Q & Earnings Data Ingestion Pipeline

### 2.1 Primary Metric Data Schemas & Consensus Comparison

Earnings data is pulled directly from primary **SEC EDGAR 10-Q filings** combined with **Wall Street Consensus (Moomoo / Bloomberg Feed)**:

| Field Name | Data Type | Source Pipeline | Ingestion Latency | Example (AAPL Q3 2026) |
|------------|-----------|-----------------|-------------------|------------------------|
| `period_ending_date` | `ISO-8601 Date` | SEC EDGAR 10-Q Cover Page | `< 5 mins` from filing | `2026-06-30` |
| `earnings_release_date` | `String` | Company Press Release / BusinessWire | Real-Time | `2026-07-30 (After Market Close)` |
| `revenue_reported_m` | `Float ($M)` | Consolidated Statement of Operations | Instant SEC Parse | `$85,780.0M` ($85.78B) |
| `revenue_consensus_m` | `Float ($M)` | Consensus Estimates Feed | Pre-Filing Lock | `$85,420.0M` ($85.42B) |
| `revenue_surprise_pct` | `Float (%)` | Calculated: $\frac{\text{Rev}_{\text{Rep}} - \text{Rev}_{\text{Con}}}{\text{Rev}_{\text{Con}}} \times 100\%$ | Instant | **`+0.42%` 🟢 Beat** |
| `net_income_reported_m` | `Float ($M)` | Net Income Line Item | Instant SEC Parse | `$21,450.0M` ($21.45B) |
| `net_income_consensus_m` | `Float ($M)` | Consensus Net Income Feed | Pre-Filing Lock | `$19,930.0M` ($19.93B) |
| `net_income_surprise_pct`| `Float (%)` | Calculated: $\frac{\text{NI}_{\text{Rep}} - \text{NI}_{\text{Con}}}{\text{NI}_{\text{Con}}} \times 100\%$ | Instant | **`+7.63%` 🟢 Net Income Beat** |
| `eps_reported` | `Float ($)` | Diluted EPS Line Item | Instant SEC Parse | `$1.40` |
| `eps_consensus` | `Float ($)` | Diluted Consensus EPS Feed | Pre-Filing Lock | `$1.34` |
| `eps_surprise_pct` | `Float (%)` | Calculated: $\frac{\text{EPS}_{\text{Rep}} - \text{EPS}_{\text{Con}}}{\text{EPS}_{\text{Con}}} \times 100\%$ | Instant | **`+4.48%` 🟢 EPS Beat** |

---

## 🗄️ 3. Database Schemas (`institutional_pms.db`)

### 3.1 Table: `earnings_review_history`

Stores full 8-step primary source earnings reviews keyed by `(ticker, quarter)`:

```sql
CREATE TABLE IF NOT EXISTS earnings_review_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    quarter TEXT NOT NULL,
    period_ending_date TEXT NOT NULL,
    earnings_release_date TEXT NOT NULL,
    report_json TEXT NOT NULL,
    report_markdown TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ticker, quarter)
);
```

### 3.2 Table: `watchlist`

Stores default and user-added portfolio watchlist symbols:

```sql
CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL UNIQUE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔄 4. Consolidated Earnings Review Architecture Specifications

### 4.1 Thesis Drift Delta & Quarterly Moat Audit Specification

Integrated into `/earnings-review` Section 5.5:
- **Qualitative Status**: `INTACT 🟢 / DRIFTING 🔴 / BROKEN ❌`
- **Moat Width Delta**: Evaluated against ROIC compounding rate ($\ge 15.0\%$).
- **Guidance & Margin Delta**: Compares Reported vs Whisper Numbers and Gross Margin expansion.

### 4.2 News Pulse & 3-Vector Price Action Attribution Specification

Integrated into `/earnings-review` Section 5.6:
- **3-Vector Breakdown Bar**:
  - `Fundamental Catalyst Weight`: $55\%$
  - `Macro & Sector Beta Weight`: $30\%$
  - `Liquidity & Noise Weight`: $15\%$
- **Causal Attribution Engine**: Resolves why a ticker experiences rapid price moves (e.g. why AAPL dropped -6.08% after-hours despite +0.42% Revenue and +7.63% Net Income beats).
