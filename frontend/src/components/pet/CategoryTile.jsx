import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryTile = ({ category }) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
      <CardActionArea component={Link} to={`/catalog?category=${category.name}`} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={category.imageUrl || `https://via.placeholder.com/400x300?text=${category.displayName}`}
          alt={category.displayName}
          sx={{ height: 200, objectFit: 'cover' }}
        />
        <CardContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 700, color: 'primary.800' }}>
            {category.displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryTile;
