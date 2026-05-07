import React, { useState, useEffect } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Pagination, Container, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import PetGrid from '../components/pet/PetGrid';
import { getPets } from '../api/petApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ErrorAlert from '../components/common/ErrorAlert';

const CATEGORIES = [
  { label: 'All Pets', value: '' },
  { label: 'Dogs', value: 'DOG' },
  { label: 'Cats', value: 'CAT' },
  { label: 'Birds', value: 'BIRD' },
  { label: 'Fish', value: 'FISH' },
];

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sort = searchParams.get('sort') || 'price,asc';

  const [pets, setPets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getPets({
          category,
          page: page - 1, // API is 0-indexed, UI is 1-indexed
          size: 12,
          sort
        });
        setPets(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message || 'Failed to load pets');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCatalog();
    window.scrollTo(0, 0);
  }, [category, page, sort]);

  const handleCategoryChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('category', value);
    } else {
      newParams.delete('category');
    }
    newParams.set('page', '1'); // Reset to page 1 on category change
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    newParams.set('page', '1'); // Reset to page 1 on sort change
    setSearchParams(newParams);
  };

  const handlePageChange = (event, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value.toString());
    setSearchParams(newParams);
  };

  return (
    <Container maxWidth="lg">
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          fontFamily: 'serif',
          fontWeight: 700, 
          color: '#131d19',
          fontSize: { xs: '2rem', md: '3rem' },
          mb: 6,
        }}
      >
        Pet Catalog
      </Typography>

      {/* Filter & Sort Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: 2,
          mb: 6,
          flexWrap: 'wrap',
        }}
      >
        {/* Category Buttons */}
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            onClick={() => handleCategoryChange(cat.value)}
            sx={{
              px: 3,
              py: 1,
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              border: '2px solid',
              whiteSpace: 'nowrap',
              ...(category === cat.value
                ? {
                    backgroundColor: '#639279',
                    color: '#ffffff',
                    borderColor: '#639279',
                  }
                : {
                    backgroundColor: '#fafaf8',
                    color: '#639279',
                    borderColor: '#ddd0c4',
                    '&:hover': {
                      backgroundColor: '#e6ddd2',
                      borderColor: '#639279',
                    },
                  }
              ),
            }}
          >
            {cat.label}
          </Button>
        ))}

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Sort Dropdown */}
        <FormControl
          size="small"
          sx={{
            minWidth: 220,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#fafaf8',
              '& fieldset': {
                borderColor: '#ddd0c4',
              },
              '&:hover fieldset': {
                borderColor: '#639279',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#639279',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#77a58d',
              '&.Mui-focused': {
                color: '#639279',
              }
            }
          }}
        >
          <InputLabel id="sort-select-label" sx={{ color: '#77a58d' }}>Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            value={sort}
            label="Sort By"
            onChange={handleSortChange}
            sx={{
              color: '#131d19',
              '& .MuiSvgIcon-root': {
                color: '#639279',
              }
            }}
          >
            <MenuItem value="price,asc">Price: Low to High</MenuItem>
            <MenuItem value="price,desc">Price: High to Low</MenuItem>
            <MenuItem value="name,asc">Name: A to Z</MenuItem>
            <MenuItem value="name,desc">Name: Z to A</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <ErrorAlert message={error} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : pets.length === 0 ? (
        <EmptyState 
          title="No Pets Found" 
          message={category ? `We don't have any ${category.toLowerCase()}s available right now.` : 'Our catalog is currently empty.'}
          actionText={category ? "View All Pets" : null}
          actionLink={category ? "/catalog" : null}
        />
      ) : (
        <>
          <PetGrid pets={pets} />
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderColor: '#ddd0c4',
                    color: '#639279',
                    fontWeight: 600,
                    '&.Mui-selected': {
                      backgroundColor: '#639279',
                      color: '#ffffff',
                    },
                    '&:hover': {
                      backgroundColor: '#e6ddd2',
                    }
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default CatalogPage;
