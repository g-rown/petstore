import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Button, Chip, Divider, Paper, Breadcrumbs } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPetById } from '../api/petApi';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { formatPrice, formatAgeMonths, formatDate } from '../utils/formatters';

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await getPetById(id);
        setPet(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('not-found');
        } else {
          setError(err.message || 'Failed to load pet details');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPet();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setAddingToCart(true);
    const result = await addToCart(pet.id);
    setAddingToCart(false);
    
    if (result.success) {
      // Could show toast here
    } else {
      alert(result.message); // Simple alert for now, can be replaced with Toast
    }
  };

  if (isLoading) return <LoadingSpinner />;
  
  if (error === 'not-found' || !pet) {
    return (
      <EmptyState 
        title="Pet Not Found" 
        message="This pet may have been adopted or doesn't exist."
        actionText="Back to Catalog"
        actionLink="/catalog"
      />
    );
  }

  const isAvailable = pet.status === 'AVAILABLE';

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
        <Link to={`/catalog?category=${pet.category.name}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {pet.category.displayName}
        </Link>
        <Typography color="text.primary">{pet.name}</Typography>
      </Breadcrumbs>

      <Button 
        component={Link} 
        to="/catalog" 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 3, textTransform: 'none' }}
        color="inherit"
      >
        Back to Catalog
      </Button>

      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, bgcolor: 'white', border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={6}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Box 
              component="img" 
              src={pet.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'} 
              alt={pet.name}
              sx={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: 3,
                objectFit: 'cover',
                maxHeight: 500
              }} 
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 800 }}>
                {pet.name}
              </Typography>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                {formatPrice(pet.price)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <Chip label={pet.category.displayName} color="primary" variant="outlined" />
              <Chip 
                label={pet.status} 
                color={isAvailable ? 'success' : (pet.status === 'SOLD' ? 'error' : 'warning')} 
                sx={{ fontWeight: 'bold' }} 
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2} mb={3}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Breed</Typography>
                <Typography variant="body1" fontWeight={500}>{pet.breed || 'Mixed'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Age</Typography>
                <Typography variant="body1" fontWeight={500}>{formatAgeMonths(pet.ageMonths)}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Added</Typography>
                <Typography variant="body1" fontWeight={500}>{formatDate(pet.createdAt)}</Typography>
              </Grid>
            </Grid>

            <Box mb={4} flexGrow={1}>
              <Typography variant="h6" gutterBottom fontWeight={600}>About {pet.name}</Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                {pet.description}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              onClick={handleAddToCart}
              disabled={!isAvailable || addingToCart}
              sx={{ py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
            >
              {!isAuthenticated 
                ? 'Login to Purchase' 
                : (!isAvailable ? `Currently ${pet.status}` : (addingToCart ? 'Adding...' : 'Add to Cart'))}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PetDetailPage;
