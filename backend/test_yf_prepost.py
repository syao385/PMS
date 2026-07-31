import yfinance as yf
import json

symbols = ['NVDA', 'AMZN', 'AAPL', 'MSFT', 'BE', 'VRT', 'PLTR', 'META', 'TSLA', 'MU', 'NBIS', 'IONQ']
results = {}

for sym in symbols:
    t = yf.Ticker(sym)
    # Fetch 1m interval with prepost=True to get exact extended-hours trades
    df = t.history(period='2d', interval='1m', prepost=True)
    if not df.empty:
        last_time = str(df.index[-1])
        last_close = round(float(df.iloc[-1]['Close']), 2)
        
        # Also fetch regular daily bars
        daily_df = t.history(period='5d', interval='1d')
        reg_close = round(float(daily_df.iloc[-1]['Close']), 2) if not daily_df.empty else last_close
        prev_close = round(float(daily_df.iloc[-2]['Close']), 2) if len(daily_df) >= 2 else reg_close
        
        # If timestamp is after 16:00 (4:00 PM EST), calculate after-hours % change against today's 4pm close
        is_after_hours = "16:00:00" <= last_time.split(" ")[-1][:8] if " " in last_time else False
        
        if last_close != reg_close:
            chg_pct = round(((last_close - reg_close) / reg_close) * 100.0, 2)
            session = "After-Hours Session (Post-Market)"
            ref_close = reg_close
        else:
            chg_pct = round(((reg_close - prev_close) / prev_close) * 100.0, 2)
            session = "Regular Market Session"
            ref_close = prev_close

        results[sym] = {
            "symbol": sym,
            "last_trade_price": last_close,
            "last_timestamp": last_time,
            "todays_4pm_close": reg_close,
            "yesterdays_4pm_close": prev_close,
            "ref_close": ref_close,
            "calculated_change_pct": chg_pct,
            "session": session
        }

print(json.dumps(results, indent=2))
