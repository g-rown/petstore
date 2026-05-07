import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Grid, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getAdminPets, createPet, updatePet, deletePet } from '../api/adminApi';
import { getCategories } from '../api/petApi';
import { formatPrice } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

const AdminPage = () => {
  const [pets, setPets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPetId, setCurrentPetId] = useState(null);
  
  const initialFormState = {
    name: '', breed: '', ageMonths: '', price: '', description: '', 
    imageUrl: '', categoryId: '', status: 'AVAILABLE'
  };
  const [formData, setFormData] = useState(initialFormState);

  const fetchPets = async () => {
    try {
      const response = await getAdminPets({ page: 0, size: 100 }); // Simplified for MVP
      setPets(response.data.content);
    } catch (err) {
      setError('Failed to fetch pets for admin');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchPets(), fetchCategories()]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleOpenDialog = (pet = null) => {
    if (pet) {
      setIsEditing(true);
      setCurrentPetId(pet.id);
      setFormData({
        name: pet.name,
        breed: pet.breed || '',
        ageMonths: pet.ageMonths || '',
        price: pet.price,
        description: pet.description || '',
        imageUrl: pet.imageUrl || '',
        categoryId: pet.category.id,
        status: pet.status
      });
    } else {
      setIsEditing(false);
      setCurrentPetId(null);
      setFormData(initialFormState);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        ...formData,
        ageMonths: formData.ageMonths ? parseInt(formData.ageMonths) : null,
        price: parseFloat(formData.price)
      };

      if (isEditing) {
        await updatePet(currentPetId, payload);
      } else {
        await createPet(payload);
      }
      handleCloseDialog();
      fetchPets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save pet');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await deletePet(id);
        fetchPets();
      } catch (err) {
        setError('Failed to delete pet');
      }
    }
  };

  if (isLoading) return <LoadingSpinner label="Loading admin panel..." />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" fontWeight={800}>
          Admin Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Pet
        </Button>
      </Box>

      {error && <ErrorAlert message={error} />}

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="pets table">
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet) => (
              <TableRow key={pet.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{pet.id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box 
                      component="img" 
                      src={pet.imageUrl || 'https://via.placeholder.com/40'} 
                      alt={pet.name}
                      sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }}
                    />
                    <Typography fontWeight={500}>{pet.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{pet.category.displayName}</TableCell>
                <TableCell>{formatPrice(pet.price)}</TableCell>
                <TableCell>
                  <Chip 
                    label={pet.status} 
                    size="small"
                    color={pet.status === 'AVAILABLE' ? 'success' : (pet.status === 'SOLD' ? 'error' : 'warning')} 
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenDialog(pet)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(pet.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {pets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No pets found in the system.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pet Form Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Pet' : 'Add New Pet'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name" label="Pet Name" required fullWidth
                  value={formData.name} onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="categoryId" value={formData.categoryId}
                    label="Category" onChange={handleInputChange}
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat.id} value={cat.id}>{cat.displayName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="breed" label="Breed" fullWidth
                  value={formData.breed} onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="ageMonths" label="Age (Months)" type="number" fullWidth
                  value={formData.ageMonths} onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="price" label="Price" type="number" required fullWidth
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                  value={formData.price} onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="imageUrl" label="Image URL" fullWidth
                  value={formData.imageUrl} onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description" label="Description" multiline rows={4} fullWidth
                  value={formData.description} onChange={handleInputChange}
                />
              </Grid>

              {isEditing && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status" value={formData.status}
                      label="Status" onChange={handleInputChange}
                    >
                      <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="SOLD">SOLD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Save Changes' : 'Create Pet'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default AdminPage;
