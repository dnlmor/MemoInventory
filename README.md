# MemoInventory

A simple Web App to implement GitHub Actions


# File Structure

memo-inventory/
├── backend/                     # Backend (Flask) directory
│   ├── server.py                # Main Flask application
│   ├── memo_operations.py       # Memo CRUD operations (SQLite handling)
│   ├── user_operations.py       # User authentication (signup/login) operations
│   ├── requirements.txt         # Python dependencies
│   ├── setup_database.py        # Script to set up the SQLite database and tables
│   └── memos.db                 # SQLite database file
└── frontend/                    # Frontend (React) directory
    ├── public/
    │   ├── index.html           # Main HTML file
    │   └── favicon.ico          # Favicon for the application
    ├── src/
    │   ├── components/
    │   │   ├── MemoForm.js      # React component for adding new memos
    │   │   ├── Memo.js          # React component for displaying a single memo
    │   │   ├── MemoList.js      # React component for listing all memos
    │   │   ├── LoginForm.js     # React component for user login
    │   │   ├── SignupForm.js    # React component for user signup
    │   └── services/
    │       ├── memoService.js   # API service for interacting with backend (memos)
    │       └── authService.js   # API service for interacting with backend (auth)
    ├── App.js                   # Main React component
    ├── index.js                 # React entry point
    ├── App.css                  # Main CSS file
    └── package.json             # Frontend dependencies
