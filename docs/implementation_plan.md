# 🏛️ Implementation Plan: Left & Right Panel UI Redesign, Earnings Calendar & News Portal Optimization

## Goal Description

This implementation plan details the full UI redesign of `LeftPanel.tsx` and `RightPanel.tsx` to streamline the user interface and enhance institutional functionality:
1. **Left Panel Redesign**:
   - Scrollable Portfolio Watchlist with default 10 tickers (`NVDA`, `AAPL`, `MSFT`, `TSLA`, `PLTR`, `MU`, `IONQ`, `NBIS`, `VRT`, `BE`).
   - Watchlist columns: **Symbol**, **Earnings Date** (Upcoming `AMC`/`BMO` within 7 days, or passed date), **Real-Time Price** (including premarket/after-hours), and **% Change** (from yesterday close).
   - **Remove non-functional components**: Remove "In-Play Watchlist" and "Paper Trading Simulator".
   - **Add "Earnings Calendar This Week"**: Displaying **Symbol** and **Upcoming Earnings Date**. Clicking any symbol selects that ticker and loads its latest earnings review report in the middle panel.
2. **Right Panel News Portal Redesign**:
   - Display **10 latest company news articles** specifically for the clicked ticker.
   - Sort descending by published date/time.
   - Display **Headline**, **Publisher Source**, and **Published Timestamp**.

---

## User Review Required

> [!IMPORTANT]
> **No Code Changes Have Been Made Yet**. Please review the proposed component layouts and data structure updates below before we begin code execution.

---

## Component Layout & Specification

### 1. Left Panel (`LeftPanel.tsx`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 📈 PORTFOLIO WATCHLIST (Scrollable • Default 10 Tickers)                               │
├─────────┬──────────────────────┬─────────────┬─────────────┬───────────────────────────┤
│ Symbol  │ Earnings Date        │ Price       │ % Change    │ Action                    │
├─────────┼──────────────────────┼─────────────┼─────────────┼───────────────────────────┤
│ VRT     │ 07/29 AMC 🔴         │ $84.50      │ -3.10%      │ [Trash Icon]              │
│ NBIS    │ 07/28 BMO 🟢         │ $24.50      │ +9.58%      │ [Trash Icon]              │
│ BE      │ 07/29 AMC 🟢         │ $14.80      │ +2.53%      │ [Trash Icon]              │
│ NVDA    │ 08/27 AMC            │ $125.00     │ +1.25%      │ [Trash Icon]              │
└─────────┴──────────────────────┴─────────────┴─────────────┴───────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 📅 EARNINGS CALENDAR THIS WEEK (Click ticker to load report)                           │
├─────────┬──────────────────────────────────┬───────────────────────────────────────────┤
│ Symbol  │ Upcoming Earnings Date           │ Timing Status                             │
├─────────┼──────────────────────────────────┼───────────────────────────────────────────┤
│ VRT     │ 2026-07-29                       │ After Market Close (AMC) 🟢               │
│ BE      │ 2026-07-29                       │ After Market Close (AMC) 🟢               │
│ NBIS    │ 2026-07-28                       │ Before Market Open (BMO) 🟢               │
│ AAPL    │ 2026-07-31                       │ After Market Close (AMC)                  │
└─────────┴──────────────────────────────────┴───────────────────────────────────────────┘
```

### 2. Right Panel (`RightPanel.tsx`)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 📰 NEWS PORTAL (10 Latest Company News for Selected Ticker - Descending Order)          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • Vertiv (VRT) Q2 2026 Earnings Analysis: Revenue vs Consensus                         │
│   Yahoo Finance • 2026-07-29 16:30:00 EST                                              │
│ • Datacenter Power Infrastructure Demand Trends Ahead of Q3                            │
│   Reuters • 2026-07-28 14:15:00 EST                                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Proposed Code Changes

#### [MODIFY] [data_fetcher.py](file:///c:/Users/jfan/Documents/institutional-pms/backend/app/services/data_fetcher.py)
- Update `fetch_live_news(symbol, count=10)` to return 10 items, extracting publication timestamp and sorting in descending order.
- Add `fetch_weekly_earnings_calendar()` returning earnings dates and AMC/BMO timing for portfolio symbols.

#### [MODIFY] [LeftPanel.tsx](file:///c:/Users/jfan/Documents/institutional-pms/frontend/src/components/LeftPanel.tsx)
- Add vertical scrollbar container to Watchlist table with 4 columns: Symbol, Earnings Date (with +/- 7 day indicator), Real-time Price, % Change.
- Remove In-Play Watchlist & Paper Trading sections.
- Add "Earnings Calendar This Week" table with clickable ticker rows.

#### [MODIFY] [RightPanel.tsx](file:///c:/Users/jfan/Documents/institutional-pms/frontend/src/components/RightPanel.tsx)
- Restructure news list to show 10 latest company news items for the active ticker, sorted in descending order of published date.

---

## Verification Plan

### Automated Tests
- Run `python test_dynamic_q4_matrix.py` to ensure core earnings review tests pass.
- Run `python test_nbis_and_watchlist.py` to verify watchlist integrity.

### Manual UI Verification
- Verify Watchlist table in Left Panel displays 4 columns with vertical scrolling.
- Verify Earnings Calendar displays upcoming earnings and clicking a row loads the ticker's report.
- Verify Right Panel displays 10 latest news items sorted in descending order for the clicked ticker.
