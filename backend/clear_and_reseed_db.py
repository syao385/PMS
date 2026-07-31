import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "institutional_pms.db")

def clear_and_reseed():
    if not os.path.exists(DB_PATH):
        print("Database file does not exist yet.")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        # Delete stale cached earnings reports
        cursor.execute("DELETE FROM earnings_review_history;")
        cursor.execute("DELETE FROM skill_execution_cache WHERE skill_id = 'earnings-review';")
        conn.commit()
        print(f"Successfully purged stale earnings_review_history and skill_execution_cache in {DB_PATH}")
    except Exception as e:
        print(f"Error purging cache: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    clear_and_reseed()
