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

export async function fetchMacroIndicators() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/market-hub/macro-indicators`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend macro indicators fetch failed', err);
  }
  return null;
}

export async function fetchOrderFlowSentiment(ticker: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/market-hub/order-flow/${ticker}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend order flow fetch failed for ${ticker}`, err);
  }
  return null;
}

export async function fetchGammaGexAnalytics(ticker: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/market-hub/gex/${ticker}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend GEX analytics fetch failed for ${ticker}`, err);
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

export async function fetchSkillCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/skills/categories`);
    if (res.ok) {
      const data = await res.json();
      return data.categories;
    }
  } catch (err) {
    console.warn('Backend skill categories fetch failed', err);
  }
  return null;
}

export async function executeSkill(skillId: string, ticker: string, params: Record<string, any> = {}, forceRefresh: boolean = false) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/skills/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skill_id: skillId,
        ticker,
        params,
        force_refresh: forceRefresh
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    }
  } catch (err) {
    console.warn(`Backend skill execution failed for ${skillId} on ${ticker}`, err);
  }
  return null;
}

export async function clearSkillCache(skillId?: string, ticker?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/skills/clear-cache`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skill_id: skillId, ticker })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend clear skill cache failed', err);
  }
  return null;
}

