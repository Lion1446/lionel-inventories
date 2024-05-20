import React, { useState } from 'react';
import './style.css';
import SearchBar from '../components/SearchBar.jsx';
import AddIcon from '@mui/icons-material/Add';
import Table from '../components/Table.jsx';
import { Box, Button, Typography } from '@mui/material';
import AddItemDialog from '../components/AddItemDialog.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchIngredients, addIngredient } from '../services/ingredients.js';
import EditItemDialog from '../components/EditItemDialog.jsx';


const Ingredients = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  });

  const mutation = useMutation({
    mutationFn: addIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] })
      handleCloseAdd();
    },
  })

  const handleAddIngredient = (newIngredient) => {
    mutation.mutate(newIngredient);
  }

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

  const filterIngredients = (data, searchTerm) => {
    return data.filter(ingredient =>
      ingredient.item?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = filterIngredients(data, searchTerm);
  return (
    <div className='content-section'>
      <Typography variant='h5'>Ingredients</Typography>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <SearchBar value={searchTerm} onChange={handleOnChange} />
        <Button onClick={handleOpenAdd} variant="contained" startIcon={<AddIcon />}>Add Item</Button>
      </div>
      <Table isLoading={isLoading} data={filteredData} />
      <AddItemDialog open={openAdd} handleSubmitButton={handleAddIngredient} handleCancelButton={handleCloseAdd} />
    </div>
  );
};

export default Ingredients;
