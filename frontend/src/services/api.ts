/*
Live API Service connecting React Frontend to Python FastAPI Backend (http://127.0.0.1:8090).
Persists watchlist to SQLite database (institutional_pms.db).
*/

const API_BASE_URL = 'http://127.0.0.1:8090';

export async function fetchWatchlistFromDB(): Promise<string[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/watchlist`);
    if (res.ok) {
      const data = await res.json();
      return data.watchlist;
    }
  } catch (err) {
    console.warn('Backend watchlist fetch failed, using local storage fallback', err);
  }
  return null;
}

export async function addWatchlistSymbolToDB(ticker: string): Promise<string[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/watchlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker })
    });
    if (res.ok) {
      const data = await res.json();
      return data.watchlist;
    }
  } catch (err) {
    console.warn(`Failed to persist symbol ${ticker} to database`, err);
  }
  return null;
}

export async function removeWatchlistSymbolFromDB(ticker: string): Promise<string[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/watchlist/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker })
    });
    if (res.ok) {
      const data = await res.json();
      return data.watchlist;
    }
  } catch (err) {
    console.warn(`Failed to remove symbol ${ticker} from database`, err);
  }
  return null;
}

export async function fetchLiveQuote(ticker: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/quote/${ticker}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend quote fetch failed for ${ticker}`, err);
  }
  return null;
}

export async function fetchLiveResearch(ticker: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/research/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticker })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend research analysis failed for ${ticker}`, err);
  }
  return null;
}

export async function fetchUniversalScreener() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/screener/universal`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend universal screener fetch failed', err);
  }
  return null;
}

export async function fetchLiveNews(ticker: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/news/${ticker}`);
    if (res.ok) {
      const data = await res.json();
      return data.news;
    }
  } catch (err) {
    console.warn(`Backend news fetch failed for ${ticker}`, err);
  }
  return null;
}
