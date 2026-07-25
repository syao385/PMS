# Institutional PMS — Discussion History & Context

This document preserves the initial research, repository evaluation, user interviews, and strategic design decisions leading to the creation of the `institutional-pms` codebase.

---

## 1. Initial Evaluation of `xbtlin/ai-berkshire`

### User Request
> "Research and evaluate whether it is a good idea to install the following github repository `https://github.com/xbtlin/ai-berkshire/` will help me build an institutional stocks/etf portfolio management system."

### Key Findings & Verdict
* **What `ai-berkshire` Is:** An AI prompt-engineering and skill framework for Claude Code / Codex CLI that codifies value investing methodologies (Warren Buffett, Charlie Munger, Duan Yongping, Li Lu).
* **Verdict:** It is **NOT** a standalone Portfolio Management System (PMS). It lacks software architecture, databases, real-time market data feeds, quantitative risk engines (VaR, factor models), and order execution.
* **Role in PMS:** It serves as a strong foundation for **Phase 1 (Qualitative AI Research Automation & Investment Memos)**, representing ~5% of the full institutional platform architecture.

---

## 2. Requirements & Priority Alignment (User Interview)

Through the `/grill-with-docs` interactive interview, the following core priorities and design choices were selected:

### Priority Ordering
1. **Phase 1 (Option C - Highest Priority):** Qualitative research automation & investment memo generation.
2. **Phase 2 (Option A - Core Quant Engine):** Quantitative backtesting, factor risk modeling, and market-neutral long/short optimization.
3. **Phase 3 (Option B - Ledger):** Position tracking, NAV accounting, and target weight drift monitoring.
4. **Phase 4 (Option D - Long Term Platform):** Full platform integration with automated background tasks and execution connectors.

### Technology & Architectural Choices
* **Directory Location:** `C:\Users\jfan\.gemini\antigravity\scratch\institutional-pms`
* **AI Provider:** Google Gemini 3.6 Flash / Pro (with configurable multi-provider API architecture).
* **Data Stack:** Free open-source stack using `yfinance` + `sec-edgar-downloader` / SEC EDGAR filings for MVP prototyping, with pluggable support for Financial Modeling Prep (FMP) / Polygon.io APIs.
* **Primary Interface:** Full React Web UI Dashboard (Vite + Tailwind CSS + Recharts + Markdown renderer).
* **Quant Strategy:** Market-Neutral Long/Short (Dollar-neutral / Beta-neutral risk parity allocation).
* **Repository Architecture:** Single Modular Monorepo (`backend/` FastAPI + `frontend/` React).

---

## 3. Approved Implementation Phases

1. **Step 1:** Initial codebase scaffold & documentation (`institutional-pms/`).
2. **Step 2:** Phase 1 Implementation — Qualitative AI Research Engine & Web Dashboard.
3. **Step 3:** Phase 2 Implementation — Market-Neutral Long/Short Quant Risk & Optimization.
4. **Step 4:** Phase 3 Implementation — Position & NAV Ledger Engine.
