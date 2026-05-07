import React from 'react';
import { Box } from '@mui/material';
import PetCard from './PetCard';

const PetGrid = ({ pets }) => {
  if (!pets || pets.length === 0) {
    return null; // Handled by EmptyState in the parent component
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </Box>
  );
};

export default PetGrid;
