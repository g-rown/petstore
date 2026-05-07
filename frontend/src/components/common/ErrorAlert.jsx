import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const ErrorAlert = ({ message, title = 'Error' }) => {
  if (!message) return null;
  
  return (
    <Alert severity="error" sx={{ mb: 3 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
