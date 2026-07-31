# TDD Walkthrough: Real-Time News Headline Parser Overhaul & Zero-Fake-Data Integration

## Overview of Fixes

In response to your observation regarding NVDA news headlines not matching the articles when clicked, we conducted a root-cause code review of [data_fetcher.py](file:///c:/Users/jfan/Documents/institutional-pms/backend/app/services/data_fetcher.py) and completely overhauled `fetch_live_news()`:

---

### 1. Root Cause Analysis: Why Headlines Showed Generic Titles
- **Root Cause**: Recent updates to the Yahoo Finance API nested news attributes inside `item['content']['title']` and `item['content']['canonicalUrl']['url']`. The legacy parser used flat key lookups `item.get("title")`, which evaluated to `None`. When `raw_news` failed to parse, the system fell through to generic fallback titles (`NVDA Quarterly Financial Analysis...`).
- **Fix Applied**: Updated `data_fetcher.py` to extract nested `content` dicts, and added a secondary Yahoo Finance RSS stream (`https://feeds.finance.yahoo.com/rss/2.0/headline?s={sym}`) plus Google News RSS. All fake generic fallback headlines have been **permanently deleted**.

---

### 2. Live NVDA Article Extraction Verification

When querying `fetch_live_news('NVDA')`, the system now extracts 100% authentic live headlines matching Yahoo Finance:

1. **Title**: *"Jensen Huang Says Memory Is Now AI's Biggest Bottleneck. Here's What That Means for Nvidia."*
   - **URL**: `https://www.fool.com/investing/2026/07/31/jensen-huang-says-memory-is-now-ais-biggest-bottle/?.tsrc=rss`
   - **Source**: `Yahoo Finance RSS`
2. **Title**: *"History Says That Nvidia Is an Unbelievable Bargain Right Now"*
   - **URL**: `https://www.fool.com/investing/2026/07/30/history-says-that-nvidia-is-an-unbelievable-bargai/?.tsrc=rss`
   - **Source**: `Yahoo Finance RSS`
3. **Title**: *"Cathie Wood buys $14.3 million of tumbling semiconductor stock"*
   - **URL**: `https://www.thestreet.com/investing/cathie-wood-buys-14-3-million-of-tumbling-semiconductor-stock-nvidia-nvda?.tsrc=rss`
   - **Source**: `Yahoo Finance RSS`

---

### 3. Automated TDD Audit Suite Results
- `python test_live_quote_pipeline_no_fake_data.py`: **1 / 1 PASSED 🟢 (20 Sub-tests OK)**
- `python test_financial_auditor_gatekeeper.py`: **3 / 3 PASSED 🟢**
- `python test_unreleased_and_db_purge.py`: **3 / 3 PASSED 🟢**
- `python test_comprehensive_system_audit.py`: **6 / 6 PASSED 🟢**
- `python test_dynamic_q4_matrix.py`: **2 / 2 PASSED 🟢**
- `python test_nbis_and_watchlist.py`: **3 / 3 PASSED 🟢**
- **Total Test Suite**: **18 / 18 PASSED 🟢** across all 6 test files.
- **Frontend Production Build**: `npm run build` compiled in `1.81s` with 0 errors.
- **GitHub Deployment**: Pushed commit `846e51f` to [https://github.com/syao385/PMS](https://github.com/syao385/PMS).
