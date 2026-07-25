# Institutional PMS (Stocks & ETFs Long/Short System)

An institutional-grade Long/Short Stocks & ETFs Portfolio Management System combining:
1. **Qualitative AI Research Engine:** Adapted from `ai-berkshire` (4-Masters methodology: Buffett, Munger, Duan Yongping, Li Lu + Multi-Agent Red Teaming).
2. **Quantitative Risk & Optimization Engine:** Long/Short market-neutral allocation, factor exposure modeling, VaR/CVaR risk analytics (`PyPortfolioOpt` / `Riskfolio-Lib`).
3. **Position & NAV Ledger:** Real-time PnL tracking, target weight drift monitoring, and rebalancing signal generator.
4. **Modern Interface:** React + Vite + Tailwind CSS Web UI Dashboard with FastAPI Python backend.

---

## Project Structure

```text
institutional-pms/
├── backend/                  # FastAPI Python Application
│   ├── app/
│   │   ├── api/              # REST Endpoints
│   │   ├── services/         # AI Research, Quant Risk, Portfolio Services
│   │   └── core/             # Configuration & Data Connectors
│   └── tests/
├── frontend/                 # React Web UI Dashboard
│   ├── src/
│   │   ├── pages/            # Research Memos, Risk Analytics, Portfolio Ledger
│   │   └── components/
│   └── public/
└── docs/                     # Specifications & Design Documentation
    ├── discussion_history.md # Initial context, architecture evaluation & interview
    └── specifications/
        └── phase1_spec.md    # Formal Phase 1 Specification
```

---

## License
Private Institutional Portfolio Management System.
