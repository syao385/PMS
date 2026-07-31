import urllib.request
import re
import json

symbols = ['NVDA', 'AMZN', 'AAPL', 'MSFT', 'BE', 'VRT', 'PLTR', 'META', 'TSLA', 'MU', 'NBIS', 'IONQ']
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

results = {}

for sym in symbols:
    url = f"https://finance.yahoo.com/quote/{sym}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Extract root.App.main or quoteSummary JSON from HTML scripts
            match_json = re.search(r'root\.App\.main\s*=\s*(\{.+?\});\s*\(function', html)
            if not match_json:
                match_json = re.search(r'\"QuoteSummaryStore\":(\{.+?\})\s*,\s*\"', html)
            
            # Regex for fin-streamer values
            reg_price_m = re.search(r'data-field="regularMarketPrice"[^>]*value="([^"]+)"', html) or re.search(r'data-field="regularMarketPrice"[^>]*val="([^"]+)"', html)
            post_price_m = re.search(r'data-field="postMarketPrice"[^>]*value="([^"]+)"', html) or re.search(r'data-field="postMarketPrice"[^>]*val="([^"]+)"', html)
            pre_price_m = re.search(r'data-field="preMarketPrice"[^>]*value="([^"]+)"', html) or re.search(r'data-field="preMarketPrice"[^>]*val="([^"]+)"', html)
            reg_chg_m = re.search(r'data-field="regularMarketChangePercent"[^>]*value="([^"]+)"', html)

            results[sym] = {
                "regular_price": reg_price_m.group(1) if reg_price_m else None,
                "post_price": post_price_m.group(1) if post_price_m else None,
                "pre_price": pre_price_m.group(1) if pre_price_m else None,
                "reg_chg_pct": reg_chg_m.group(1) if reg_chg_m else None
            }
    except Exception as e:
        results[sym] = {"error": str(e)}

print(json.dumps(results, indent=2))
