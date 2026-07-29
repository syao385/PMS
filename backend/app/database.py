"""
SQLite Database Persistence Layer for Institutional PMS.
Persists portfolio watchlist, custom symbols, and trade log state across sessions.
"""

import sqlite3
import os
from typing import List

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "institutional_pms.db"))


def init_db():
    """
    Initializes SQLite tables if they do not exist.
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Table for Portfolio Watchlist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS watchlist (
            ticker TEXT PRIMARY KEY,
            added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Seed initial default watchlist if empty
    cursor.execute("SELECT COUNT(*) FROM watchlist")
    count = cursor.fetchone()[0]
    if count == 0:
        default_symbols = ['NVDA', 'AAPL', 'MSFT', 'TSLA', 'PLTR', 'MU', 'IONQ', 'NBIS']
        for sym in default_symbols:
            cursor.execute("INSERT OR IGNORE INTO watchlist (ticker) VALUES (?)", (sym,))

    # Table for AI Berkshire Skill Executions Cache
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS skill_execution_cache (
            cache_key TEXT PRIMARY KEY,
            skill_id TEXT,
            ticker TEXT,
            params_hash TEXT,
            response_json TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def get_db_watchlist() -> List[str]:
    """
    Retrieves current persisted watchlist symbols.
    """
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT ticker FROM watchlist ORDER BY added_at ASC")
    rows = cursor.fetchall()
    conn.close()
    return [row[0] for row in rows]


def add_db_watchlist(ticker: str) -> List[str]:
    """
    Adds a symbol to SQLite database and returns updated watchlist.
    """
    sym = ticker.upper().strip()
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("INSERT OR IGNORE INTO watchlist (ticker) VALUES (?)", (sym,))
    conn.commit()
    conn.close()
    return get_db_watchlist()


def remove_db_watchlist(ticker: str) -> List[str]:
    """
    Removes a symbol from SQLite database and returns updated watchlist.
    """
    sym = ticker.upper().strip()
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM watchlist WHERE ticker = ?", (sym,))
    conn.commit()
    conn.close()
    return get_db_watchlist()


def get_cached_skill_execution(skill_id: str, ticker: str, params_hash: str = "") -> str:
    """
    Returns cached response JSON if available.
    """
    init_db()
    cache_key = f"{skill_id}:{ticker.upper().strip()}:{params_hash}"
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT response_json FROM skill_execution_cache WHERE cache_key = ?", (cache_key,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None


def save_skill_execution_cache(skill_id: str, ticker: str, params_hash: str, response_json: str):
    """
    Saves or updates a skill execution response in SQLite cache.
    """
    init_db()
    cache_key = f"{skill_id}:{ticker.upper().strip()}:{params_hash}"
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT OR REPLACE INTO skill_execution_cache (cache_key, skill_id, ticker, params_hash, response_json, updated_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    """, (cache_key, skill_id, ticker.upper().strip(), params_hash, response_json))
    conn.commit()
    conn.close()


def clear_skill_cache(skill_id: str = None, ticker: str = None):
    """
    Clears skill cache for a specific skill, ticker, or all.
    """
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if skill_id and ticker:
        cursor.execute("DELETE FROM skill_execution_cache WHERE skill_id = ? AND ticker = ?", (skill_id, ticker.upper()))
    elif skill_id:
        cursor.execute("DELETE FROM skill_execution_cache WHERE skill_id = ?", (skill_id,))
    elif ticker:
        cursor.execute("DELETE FROM skill_execution_cache WHERE ticker = ?", (ticker.upper(),))
    else:
        cursor.execute("DELETE FROM skill_execution_cache")
    conn.commit()
    conn.close()

