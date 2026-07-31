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

## 🚀 Cross-Project Market Data Integration Guide

To prevent Yahoo Finance API rate limits (`HTTP 429 Too Many Requests`), all connected projects (**@QuantBackTestEngine**, **@GammaGexTrading**, **@MarketTerminal**) should route their market data queries through `market_data_hub.py`.

### 1. Python Integration (Fastest — Direct SQLite WAL Import)

Replace direct `import yfinance as yf` calls in your project with:

```python
from app.services.market_data_hub import get_shared_market_quote

# Pull shared real-time quote (reads SQLite WAL cache in < 5ms)
quote = get_shared_market_quote("AMZN")

current_price = quote["current_price"]     # e.g. 235.50 / 257.26
price_change_24h = quote["price_change_24h"] # e.g. +9.24%
trading_session = quote["trading_session"]   # e.g. After-Hours Session (Post-Market)
```

### 2. REST API Integration (HTTP Requests)

```http
GET http://127.0.0.1:8090/api/v1/market-hub/quote/{SYMBOL}
```

---

## License
Private Institutional Portfolio Management System.

