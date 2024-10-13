import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';

const MemoCard = ({ memo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(memo.content);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await onUpdate(memo.id, updatedContent); // Call the update function
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Failed to update memo:', error);
    }
  };

  return (
    <Card
      variant="outlined"
      style={{
        marginBottom: '20px',
        borderRadius: '15px',  // Rounded edges
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Shadow effect
        transition: 'transform 0.2s', // Smooth hover effect
        '&:hover': {
          transform: 'scale(1.02)', // Slightly enlarge on hover
        },
      }}
    >
      <CardContent>
        {isEditing ? (
          <div>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              variant="outlined"
              style={{ borderRadius: '10px' }} // Rounded edges for input
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              style={{ marginTop: '10px' }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEdit}
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="body1" style={{ marginBottom: '10px' }}>
              {memo.content}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEdit}
              style={{ marginTop: '10px' }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onDelete(memo.id)}
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoCard;
