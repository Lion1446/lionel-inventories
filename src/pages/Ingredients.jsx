import React, { useState } from 'react'
import './style.css'
import SearchBar from '../components/SearchBar/SearchBar'
import AddIcon from '@mui/icons-material/Add';
import Table from '../components/Table/Table';
import { Button, Typography } from '@mui/material';
import AddItemDialog from '../components/AddItemDialog/AddItemDialog';


const Ingredients = () => {
  const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div className='content-section'>
      <Typography variant='h5'>Ingredients</Typography>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <SearchBar />   
        <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />}>Add Item</Button>   
      </div>
      <Table />
      <AddItemDialog open={open} handleSubmit={handleClose} handleCancel={handleClose} />
    </div>
  )
}



export default Ingredients
