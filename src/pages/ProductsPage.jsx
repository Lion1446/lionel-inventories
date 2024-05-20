import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import { addProduct, fetchProducts } from '../services/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProduct = () => {
    navigate('/products/create');
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      handleCloseAdd();
    },
  })

  if (isLoading || mutation.isPending) {
    return (
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(5px)',
        zIndex: 1300,
      }}>
        <CircularProgress size={100} color="primary" />
      </Box>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const filterProducts = (data, searchTerm) => {
    return data.filter(product =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = filterProducts(data, searchTerm);
  return (
    <div className='content-section'>
        <Typography variant='h5'>Products</Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SearchBar value={searchTerm} onChange={handleOnChange} />
          <Button onClick={handleAddProduct} variant="contained" startIcon={<AddIcon />}>Add Item</Button>
      </div>
      <Table page="products" isLoading={isLoading} data={filteredData} />
    </div>
  )
}



export default ProductsPage
