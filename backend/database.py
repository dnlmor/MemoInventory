import sqlite3

def create_connection():
    """Create a database connection to the SQLite database."""
    conn = None
    try:
        conn = sqlite3.connect('memos.db')
        print("Database connected successfully.")
    except sqlite3.Error as e:
        print(f"Error: {e}")
    return conn
