import sqlite3

def create_connection():
    """Create a database connection to the SQLite database."""
    return sqlite3.connect('memos.db')

def create_memo(user_id, content):
    """Insert a new memo into the database associated with a user."""
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO memos (user_id, content) VALUES (?, ?)", (user_id, content))
        conn.commit()
    except Exception as e:
        raise e
    finally:
        conn.close()

def get_memos(user_id):
    """Retrieve all memos for a specific user from the database."""
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM memos WHERE user_id = ?", (user_id,))
        rows = cursor.fetchall()
        return [{'id': row[0], 'content': row[2]} for row in rows]  # Assuming the 2nd index is content
    except Exception as e:
        raise e
    finally:
        conn.close()

def update_memo(memo_id, content):
    """Update a memo's content by its ID."""
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE memos SET content = ? WHERE id = ?", (content, memo_id))
        conn.commit()
        if cursor.rowcount == 0:
            raise Exception('Memo not found')
    except Exception as e:
        raise e
    finally:
        conn.close()

def delete_memo(memo_id):
    """Delete a memo by its ID."""
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM memos WHERE id = ?", (memo_id,))
        conn.commit()
        if cursor.rowcount == 0:
            raise Exception('Memo not found')
    except Exception as e:
        raise e
    finally:
        conn.close()
