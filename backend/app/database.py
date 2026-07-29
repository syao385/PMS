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
