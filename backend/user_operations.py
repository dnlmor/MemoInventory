import sqlite3
import bcrypt

def create_connection():
    """Create a database connection to the SQLite database."""
    return sqlite3.connect('memos.db')

def create_user(username, hashed_password):
    """Create a new user in the database."""
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, hashed_password))
        conn.commit()
    except sqlite3.IntegrityError:
        raise Exception('Username already exists')  # Handle duplicate usernames
    except Exception as e:
        raise e
    finally:
        conn.close()

def get_user_by_username(username):
    """Retrieve a user by their username."""
    conn = create_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        return cursor.fetchone()
    except Exception as e:
        raise e
    finally:
        conn.close()

def authenticate_user(username, password):
    """Authenticate a user by checking the hashed password."""
    user = get_user_by_username(username)
    if user and bcrypt.checkpw(password.encode('utf-8'), user[2]):
        return user
    return None
