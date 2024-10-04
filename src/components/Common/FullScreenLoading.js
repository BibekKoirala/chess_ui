import React from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';

function FullScreenLoading({ onCancel }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background with transparency
        zIndex: 1000, // High z-index to overlay on other content
      }}
    >
      <CircularProgress size={60} color="primary" />
      <Typography variant="h6" sx={{ margin: '20px 0' }}>
        Searching for opponent, please wait...
      </Typography>
      <Button variant="contained" color="error" onClick={onCancel}>
        Cancel Search
      </Button>
    </Box>
  );
}

export default FullScreenLoading;
