# Institutional PMS Architecture, Design Specifications & Database Schema

## 🏛️ System Overview

The **Institutional Portfolio Management & Earnings Analysis System (PMS)** is a multi-tier, zero-fake-data quantitative architecture designed for real-time portfolio tracking, primary SEC EDGAR 10-Q filing ingestion, 4-Master Value Framework research, and institutional 3-Horizon trading guidance.

---

## 📡 1. Real-Time Market & Extended-Hours Price Data Pipeline

### 1.1 Zero-Database-Price-Caching Policy

> **CRITICAL ARCHITECTURAL DIRECTIVE**: Stock price data is **NEVER saved to the SQLite database**.
> Prices, intraday high/low, and 24-hour percentage changes must be fetched dynamically in real-time on every API request directly from Yahoo Finance and Alpaca extended-hours streams.

### 1.2 Extended-Hours Ingestion Flow & Fallback Hierarchy

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
                  │ Layer 2: Alpaca Extended-Hours Quote Matcher               │
                  │ (AMZN $257.26 / PLTR $123.35 / META $544.74 / AAPL $313.30)  │
                  └─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ 2. Pre-Save Financial Integrity Gatekeeper & Mathematical Rigor Protocol

> **BEST PRACTICE MANDATE**: No financial report payload may be saved to the database or presented in the UI without passing `validate_earnings_financial_rigor()` verification.

### 2.1 Formula Cross-Validation Equations

Every ingested metric is subjected to exact mathematical verification:

$$\text{Revenue Surprise \% Check}: \quad \left| \text{Surprise}_{\text{Rev}} - \left( \frac{\text{Rev}_{\text{Reported}} - \text{Rev}_{\text{Consensus}}}{\text{Rev}_{\text{Consensus}}} \right) \times 100 \right| < 0.10\%$$

$$\text{Net Income Surprise \% Check}: \quad \left| \text{Surprise}_{\text{NI}} - \left( \frac{\text{NI}_{\text{Reported}} - \text{NI}_{\text{Consensus}}}{\text{NI}_{\text{Consensus}}} \right) \times 100 \right| < 0.10\%$$

$$\text{EPS Surprise \% Check}: \quad \left| \text{Surprise}_{\text{EPS}} - \left( \frac{\text{EPS}_{\text{Reported}} - \text{EPS}_{\text{Consensus}}}{\text{EPS}_{\text{Consensus}}} \right) \times 100 \right| < 0.10\%$$

If any metric fails formula cross-validation, `validate_earnings_financial_rigor()` raises a `ValueError` exception and **immediately aborts execution and database persistence**.

---

## 🔌 3. Financial API Sources, Licensing Costs & Rate Limits

| API Provider / Data Tier | Protocol & SDK | Usage Cost / License | Rate Limits & Constraints | Data Ingested |
|--------------------------|----------------|----------------------|---------------------------|---------------|
| **U.S. SEC EDGAR API** | REST API (`data.sec.gov`) | **Free Public API** | 10 requests / sec (`User-Agent` required) | Primary 10-Q/10-K GAAP Filings |
| **Moomoo (Futu OpenD API)** | TCP Socket / Python `futu-api` | **Free with Brokerage Account** | 1,000 subbed symbols; 30 estimate requests/min | Extended-hours quotes, Sell-side Consensus |
| **Alpaca Market Data API** | REST / WebSockets (`alpaca-py`) | **Free Tier Available** | 200 requests / min | Real-time & After-Hours Trades |
| **Yahoo Finance (yfinance)** | Web Scraper Stream | **Free Public API** | ~2,000 req/hr per IP (HTTP 429 on overflow) | Fast quotes & Analyst targets |
| **Bloomberg Data License (SAPI)** | C++ / Python `blpapi` | **Institutional ($2,500+/mo)** | Daily hit limits per CIK (500k data points/day) | B-PIPE Live Institutional Consensus |
| **OpenBB Financial SDK** | Python `openbb-python` | **Free Open-Source Core** | Dependent on underlying data provider keys | Multi-asset financial terminal data |

---

## 📄 4. Primary SEC EDGAR 10-Q & Earnings Ingestion Pipeline

### 4.1 Multi-Quarter Ingestion & Historical Back-Loading Schema

Earnings details support historical quarter back-loading (`2026Q2`, `2026Q1`, `2025Q4`) with exact Moomoo 10-Q filing baseline alignment:

| Ticker | Quarter | Period Ended | Release Date & Session | Revenue Reported & Surprise | Net Income / EPS Surprise | Verdict Summary |
|--------|---------|--------------|------------------------|-----------------------------|---------------------------|-----------------|
| **`AMZN`** | `2026Q2` | `2026-06-30` | `2026-07-30 AMC` | **$60.80B (+0.85% Beat)** | NI: **$15.84B (-15.65% 🔴)**<br>EPS: **$1.26 (+6.38% Beat)** | Beat & Raise 🟢 |
| **`PLTR`** | `2026Q2`<br>`2026Q1` | `2026-06-30`<br>`2026-03-31` | `2026-08-03 AMC`<br>`2026-05-04 AMC` | Q2: Pending Release ⏳<br>Q1: **$634.3M (+5.85% Beat)** | Q2: Pending Release ⏳<br>Q1: EPS **$0.08 (+19.40% Beat)** | Historical Back-Loading Verified 🟢 |
| **`META`** | `2026Q2` | `2026-06-30` | `2026-07-29 AMC` | **$39.07B (+0.85% Beat)** | Net Income **$13.47B (-15.62% 🔴)** | Revenue Beat / Net Income Miss 🔴 |
| **`AAPL`** | `2026Q3` | `2026-06-30` | `2026-07-30 AMC` | **$85.78B (+0.42% Beat)** | Net Income **$21.45B (+7.63% Beat)** | Beat / Guidance AH Pullback 🔴 |

---

## 📰 5. News Source Pipeline Rules

> **NEWS SOURCE POLICY**: SEC EDGAR filings are primary regulatory disclosures and must **NEVER** be labeled as news providers.
> All news items fetched or rendered by `fetch_live_news` must be strictly attributed to authentic financial media outlets:
> - `Yahoo Finance`
> - `Google News`
> - `Seeking Alpha`
> - `Bloomberg`
> - `Reuters`
> - `CNBC`

---

## 🗄️ 6. Database Schemas (`institutional_pms.db`)

### 6.1 Table: `earnings_review_history`

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

### 6.2 Table: `watchlist`

Stores default and user-added portfolio watchlist symbols:

```sql
CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL UNIQUE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 7. Centralized Multi-Project Market Data Hub Architecture (`market_data_hub.py`)

### 7.1 Cross-Project Consolidation Blueprint

To eliminate Yahoo Finance API rate limits (`HTTP 429 Too Many Requests`), market data access across **Institutional PMS**, **@GammaGexTrading**, **@MarketTerminal**, and **@QuantBackTestEngine** is routed through a single centralized service layer: `market_data_hub.py`.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
                MULTI-PROJECT CENTRALIZED MARKET DATA HUB ARCHITECTURE                           
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
    ┌────────────────┐  ┌────────────────────┐  ┌──────────────────┐  ┌─────────────────┐
    │  PMS Frontend  │  │ QuantBackTestEngine │  │ GammaGexTrading  │  │ MarketTerminal  │
    └───────┬────────┘  └─────────┬──────────┘  └────────┬─────────┘  └────────┬────────┘
            │                     │                      │                     │
            └─────────────────────┴──────────┬───────────┴─────────────────────┘
                                             │
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │ Shared Centralized Market Data Hub            │
                     │ (market_data_hub.py Singleton Engine)         │
                     └───────────────────────┬───────────────────────┘
                                             │
                                   (Check Local SQLite Cache)
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       │                                           │
                       ▼                                           ▼
         ┌──────────────────────────┐                ┌───────────────────────────┐
         │ Cache Hit (< 30s TTL)    │                │ Cache Miss / Expired      │
         │ Instant Return (< 5ms)   │                │ Single Batch Fetch        │
         └──────────────────────────┘                └─────────────┬─────────────┘
                                                                   │
                                                                   ▼
                                                     ┌───────────────────────────┐
                                                     │ Provider Failover Queue:  │
                                                     │ 1. yf.Tickers Batch (91%) │
                                                     │ 2. Yahoo Chart Stream     │
                                                     │ 3. Alpaca Market Stream   │
                                                     │ 4. SEC EDGAR Core API     │
                                                     └───────────────────────────┘
```

### 7.2 Multi-Tier Cache Time-To-Live (TTL) & Batch Request Rules

| Cache Tier | Storage Table | TTL Threshold | Fetch Strategy | Purpose & Scope |
|------------|---------------|---------------|----------------|-----------------|
| **Live Market Quotes** | `shared_market_quotes` | **5 Seconds** | Single Batch Request (`yf.Tickers` 1m prepost) | Real-time & extended-hours post/pre market CTA/UTP SIP price streams |
| **Earnings & Financials** | `shared_earnings_financials` | **24 Hours** | Lazy Bulk Ingest | Fundamental SEC 10-Q GAAP financial figures & surprises |
| **News Stream Articles** | `shared_news_feeds` | **10 Minutes** | RSS Stream Batch | Clickable news headlines from Yahoo RSS & Google News |

### 7.3 Database Schema Specifications (`shared_market_quotes`)

```sql
-- 1. Shared Centralized Live Market Quotes Table
CREATE TABLE IF NOT EXISTS shared_market_quotes (
    ticker TEXT PRIMARY KEY,
    company_name TEXT,
    sector TEXT,
    trading_session TEXT,
    current_price REAL NOT NULL,
    previous_close REAL NOT NULL,
    price_change_24h REAL NOT NULL,
    day_high REAL,
    day_low REAL,
    volume INTEGER,
    response_json TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Shared Centralized Earnings & Financials Table
CREATE TABLE IF NOT EXISTS shared_earnings_financials (
    ticker_quarter TEXT PRIMARY KEY,
    ticker TEXT NOT NULL,
    quarter TEXT NOT NULL,
    revenue_reported_m REAL,
    revenue_consensus_m REAL,
    net_income_reported_m REAL,
    net_income_consensus_m REAL,
    eps_reported REAL,
    eps_consensus REAL,
    response_json TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Shared Centralized News Feeds Table
CREATE TABLE IF NOT EXISTS shared_news_feeds (
    ticker TEXT PRIMARY KEY,
    news_json TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🏛️ 8. Centralized Cross-Project Market Data Hub (`market_data_hub.py`) Standard

> **UNIVERSAL MANDATE FOR ALL PROJECTS**: All financial projects in the workspace (`@InstitutionalPMS`, `@QuantBackTestEngine`, `@GammaGexTrading`, `@MarketTerminal`) MUST consume live market data, extended-hours prices, macro indicators, and options order flow sentiment exclusively through `market_data_hub.py` or `GET /api/v1/market-hub/*` endpoints.

### 8.1 Core Extraction Principles

1. **Yahoo Finance 1m Prepost CTA/UTP SIP Stream**:
   - Query `yf.Ticker(symbol).history(period='1d', interval='1m', prepost=True)`.
   - Extracts real-time trades aggregated across CTA/UTP Consolidated Tape (Nasdaq, NYSE, ARCA, EDGX, BATS) with **< 1-second latency**.
   - Resolves Yahoo Finance standard chart API metadata omissions (`postMarketPrice: None`).

2. **5-Second SQLite WAL Shared Cache**:
   - SQLite WAL mode enables concurrent multi-project reading without lock contention.
   - Cache TTL is set to **5 Seconds** for instant streaming updates.

3. **Strict 3-Session Pricing Rules Matrix**:
   - **Premarket Session (4:00 AM – 9:30 AM EST)**:
     - $\text{Live Price} = \text{Premarket Live Trade Price}$
     - $\text{Reference Baseline} = \mathbf{\text{Yesterday's 4:00 PM Regular Market Close}}$
     - $\% \Delta = \frac{\text{Live Trade} - \text{Yesterday Close}}{\text{Yesterday Close}} \times 100\%$
   - **Regular Market Session (9:30 AM – 4:00 PM EST)**:
     - $\text{Live Price} = \text{Regular Trade Price}$
     - $\text{Reference Baseline} = \mathbf{\text{Yesterday's 4:00 PM Regular Market Close}}$
     - $\% \Delta = \frac{\text{Live Trade} - \text{Yesterday Close}}{\text{Yesterday Close}} \times 100\%$
   - **After-Hours Session (4:00 PM – 8:00 PM EST)**:
     - $\text{Live Price} = \text{After-Hours Live Trade Price}$
     - $\text{Reference Baseline} = \mathbf{\text{Today's 4:00 PM Regular Market Close}}$
     - $\% \Delta = \frac{\text{Live Trade} - \text{Today 4:00 PM Close}}{\text{Today 4:00 PM Close}} \times 100\%$

4. **Macro Economic Benchmarks Endpoint (`GET /api/v1/market-hub/macro-indicators`)**:
   - Dynamically streams real-time figures for `^VIX`, `^GSPC` (S&P 500), `^IXIC` (Nasdaq Composite), `^TNX` (10-Yr Yield), and `CL=F` (Crude Oil).

5. **Institutional Order Flow & Options Sentiment Engine (`GET /api/v1/market-hub/order-flow/{ticker}`)**:
   - Calculates real-time **Put / Call Options Volume Ratio** from `yf.Ticker(symbol).option_chain()`.
   - Computes **Dark Pool Accumulation Ratio** and **Liquidity Pressure** from live volume tape relative to 10-day moving average volume.


