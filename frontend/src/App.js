import React, { useState } from 'react';
import MemoList from './components/MemoList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { CssBaseline, Container, Typography, Button } from '@mui/material';
import { updateMemo } from './services/memoService'; // Import the updateMemo function

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [memos, setMemos] = useState([]); // State for storing memos

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(false); // Set to false to ensure we revert back to login after signup
    setShowSignup(false); // Close signup form
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Revert back to login page
    setMemos([]); // Clear memos on logout
  };

  const handleUpdateMemo = async (id, updatedContent) => {
    try {
      await updateMemo(id, updatedContent); // Call the updateMemo API function
      // Update the local memos state after successful update
      setMemos((prevMemos) =>
        prevMemos.map((memo) => (memo.id === id ? { ...memo, content: updatedContent } : memo))
      );
    } catch (error) {
      console.error('Failed to update memo:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to Your Memo Inventory
      </Typography>
      {!isLoggedIn ? (
        <>
          {showSignup ? (
            <SignupForm onSignup={handleSignup} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          <Button
            variant="text"
            onClick={() => setShowSignup(!showSignup)}
            style={{ marginTop: '20px' }}
          >
            {showSignup ? 'Already have an account? Login' : 'No account? Signup'}
          </Button>
        </>
      ) : (
        <>
          <MemoList 
            memos={memos}
            onUpdate={handleUpdateMemo}  // Pass update handler to MemoList
            setMemos={setMemos} // Pass setMemos to update the state directly
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ marginTop: '20px', width: '100%' }}
          >
            Logout
          </Button>
        </>
      )}
    </Container>
  );
}

export default App;
