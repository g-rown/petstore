import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = ({ label = 'Loading...' }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
