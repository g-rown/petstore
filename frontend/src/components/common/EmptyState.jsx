import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

const EmptyState = ({ 
  icon = <PetsIcon sx={{ fontSize: 60, color: 'text.disabled' }} />, 
  title = 'No Results Found', 
  message = 'We could not find what you are looking for.',
  actionText,
  actionLink
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, textAlign: 'center' }}>
      {icon}
      <Typography variant="h5" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
        {message}
      </Typography>
      {actionText && actionLink && (
        <Button component={Link} to={actionLink} variant="contained" color="primary">
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
