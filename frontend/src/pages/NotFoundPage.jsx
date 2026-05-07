import React from 'react';
import EmptyState from '../components/common/EmptyState';
import { Box } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <EmptyState 
        title="404 - Page Not Found" 
        message="Oops! The page you are looking for doesn't exist or has been moved."
        actionText="Return Home"
        actionLink="/"
      />
    </Box>
  );
};

export default NotFoundPage;
