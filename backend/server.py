from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import bcrypt
import sqlite3
from memo_operations import create_memo, get_memos, update_memo, delete_memo
from user_operations import create_user, authenticate_user, get_user_by_username

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# ===== Memo Operations =====

@app.route('/memos', methods=['GET'])
def get_all_memos():
    """Fetch all memos."""
    try:
        memos = get_memos()
        return jsonify(memos), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/memos', methods=['POST'])
def create_new_memo():
    """Create a new memo."""
    data = request.json
    if 'content' not in data or not data['content']:
        return jsonify({'error': 'Content is required'}), 400
    try:
        create_memo(data['content'])
        return jsonify({'message': 'Memo created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/memos/<int:memo_id>', methods=['PUT'])
def update_existing_memo(memo_id):
    """Update an existing memo by ID."""
    data = request.json
    if 'content' not in data or not data['content']:
        return jsonify({'error': 'Content is required'}), 400
    try:
        update_memo(memo_id, data['content'])
        return jsonify({'message': 'Memo updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/memos/<int:memo_id>', methods=['DELETE'])
def delete_existing_memo(memo_id):
    """Delete a memo by ID."""
    try:
        delete_memo(memo_id)
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===== User Authentication =====

@app.route('/signup', methods=['POST'])
def signup():
    """Handle user signup."""
    data = request.json
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400
    username = data['username']
    password = data['password']
    try:
        if get_user_by_username(username):
            return jsonify({'error': 'Username already exists'}), 409
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        create_user(username, hashed_password)
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    """Handle user login."""
    data = request.json
    if 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Username and password are required'}), 400
    username = data['username']
    password = data['password']
    try:
        user = authenticate_user(username, password)
        if user:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Start the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
