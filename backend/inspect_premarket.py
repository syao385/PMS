import yfinance as yf
import urllib.request
import json

symbols = ['VRT', 'NVDA', 'AMZN', 'AAPL', 'MSFT', 'BE', 'TSLA', 'MU', 'NBIS', 'PLTR', 'META']

# 1. Query Alpaca Snapshots API for latest premarket / live trade
url = f"https://data.alpaca.markets/v2/stocks/snapshots?symbols={','.join(symbols)}"
headers = {
    "APCA-API-KEY-ID": "PK6MNM5PP7MLF627QZORFTFYTI",
    "APCA-API-SECRET-KEY": "7dyFe3sR8Pc8mzSyWE7dfktpJTK6Erza2EQyRoTDHVr3"
}

req = urllib.request.Request(url, headers=headers)
resp = urllib.request.urlopen(req)
alpaca_data = json.loads(resp.read().decode('utf-8'))

out = []
for sym in symbols:
    t = yf.Ticker(sym)
    daily = t.history(period='5d', interval='1d')
    
    snap = alpaca_data.get(sym, {})
    latest_trade = snap.get("latestTrade", {})
    daily_bar = snap.get("dailyBar", {})
    prev_bar = snap.get("prevDailyBar", {})
    
    trade_p = float(latest_trade.get("p") or 0.0)
    daily_close = float(daily_bar.get("c") or 0.0)
    prev_close = float(prev_bar.get("c") or daily_close)
    
    # Calculate Premarket % Change formula:
    # Premarket Live Price = trade_p (e.g. $234.90 for VRT)
    # Reference Close = Yesterday's 4:00 PM Regular Close ($227.50 for VRT)
    # % Change = ((234.90 - 227.50) / 227.50) * 100% = +3.25%
    if trade_p > 0 and trade_p != daily_close:
        live_p = trade_p
        ref_c = daily_close
    else:
        live_p = daily_close
        ref_c = prev_close
        
    chg_pct = round(((live_p - ref_c) / ref_c) * 100.0, 2) if ref_c > 0 else 0.0
    
    out.append({
        "symbol": sym,
        "premarket_live_trade": live_p,
        "yesterdays_4pm_close": ref_c,
        "premarket_change_pct": chg_pct,
        "alpaca_latest_trade_p": trade_p,
        "alpaca_daily_bar_c": daily_close,
        "alpaca_prev_bar_c": prev_close
    })

print(json.dumps(out, indent=2))
