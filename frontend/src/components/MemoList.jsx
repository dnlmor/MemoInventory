import React, { useEffect, useState } from 'react';
import MemoCard from './MemoCard';
import MemoForm from './MemoForm';
import { getMemos, createMemo, deleteMemo, updateMemo } from '../services/memoService';
import { Grid, Typography, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MemoList = () => {
  const [memos, setMemos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    loadMemos();
  }, []);

  const loadMemos = async () => {
    try {
      const data = await getMemos();
      setMemos(data);
    } catch (error) {
      setErrorMessage('Failed to load memos.');
      setOpenSnackbar(true);
    }
  };

  const handleAddMemo = async (content) => {
    try {
      await createMemo(content);
      loadMemos();
      setShowForm(false);
    } catch (error) {
      setErrorMessage('Failed to add memo.');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteMemo = async (id) => {
    try {
      await deleteMemo(id);
      loadMemos();
    } catch (error) {
      setErrorMessage('Failed to delete memo.');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateMemo = async (id, updatedContent) => {
    try {
      await updateMemo(id, updatedContent); // Call the update API
      loadMemos(); // Refresh the memo list after updating
    } catch (error) {
      setErrorMessage('Failed to update memo.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Memo List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: '20px' }}
      >
        {showForm ? 'Cancel' : 'Add Memo'}
      </Button>
      {showForm && <MemoForm onAddMemo={handleAddMemo} />}
      <Grid container spacing={2}>
        {memos.map((memo) => (
          <Grid item xs={12} sm={6} md={4} key={memo.id}>
            <MemoCard memo={memo} onDelete={handleDeleteMemo} onUpdate={handleUpdateMemo} />
          </Grid>
        ))}
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MemoList;
