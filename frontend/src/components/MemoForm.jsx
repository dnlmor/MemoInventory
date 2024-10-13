import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';

const MemoForm = ({ onAddMemo }) => {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddMemo(content);
      setContent('');
    } else {
      setErrorMessage('Memo content is required');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="New Memo"
        variant="outlined"
        margin="normal"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Add Memo
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default MemoForm;
