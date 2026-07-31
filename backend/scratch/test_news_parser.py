import yfinance as yf
import urllib.request
import xml.etree.ElementTree as ET
import json

def fetch_real_news(symbol: str):
    sym = symbol.upper().strip()
    news = []
    
    # 1. Try yfinance news
    try:
        t = yf.Ticker(sym)
        raw = t.news or []
        print(f"yfinance raw news count for {sym}: {len(raw)}")
        for item in raw:
            content = item.get("content", {})
            title = content.get("title") or item.get("title") or ""
            
            # Extract URL
            link = ""
            if content.get("canonicalUrl"):
                link = content["canonicalUrl"].get("url", "")
            elif content.get("clickThroughUrl"):
                link = content["clickThroughUrl"].get("url", "")
            elif item.get("link"):
                link = item["link"]
            if not link:
                link = f"https://finance.yahoo.com/quote/{sym}/news"

            provider = content.get("provider", {}).get("displayName") or item.get("publisher") or "Yahoo Finance"
            pub_date = content.get("pubDate") or item.get("providerPublishTime")

            if title:
                news.append({"title": title, "url": link, "provider": provider, "pub_date": pub_date})
    except Exception as e:
        print(f"yfinance error: {e}")

    # 2. Try Yahoo RSS feed
    try:
        rss_url = f"https://feeds.finance.yahoo.com/rss/2.0/headline?s={sym}&region=US&lang=en-US"
        req = urllib.request.Request(rss_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            xml_data = resp.read()
            root = ET.fromstring(xml_data)
            for item in root.findall(".//item"):
                title = item.findtext("title")
                link = item.findtext("link")
                pub_date = item.findtext("pubDate")
                if title and link:
                    news.append({"title": title, "url": link, "provider": "Yahoo Finance RSS", "pub_date": pub_date})
    except Exception as e:
        print(f"RSS error: {e}")

    print(f"Total extracted real news for {sym}: {len(news)}")
    for n in news[:5]:
        print(" - TITLE:", n["title"])
        print("   URL:  ", n["url"])
        print("   PROV: ", n["provider"])

if __name__ == "__main__":
    fetch_real_news("NVDA")
    print("="*60)
    fetch_real_news("AMZN")
