import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Stack, TextField } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
  
  return <Slide direction="up" ref={ref} {...props} />;
});
const AddItemDialog = ({open, handleCancel, handleSubmit}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [lossTolerance, setLossTolerance] = useState('');
  const [unit, setUnit] = useState('');
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [lossToleranceError, setLossToleranceError] = useState(false);
  const [unitError, setUnitError] = useState(false);
  const handleNameChange = (event) => {
    setName(event.target.value);
    // Example validation: Required field
    setNameError(event.target.value === '');
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    // Example validation: Required field
    setCategoryError(event.target.value === '');
  };

  const handleLossToleranceChange = (event) => {
    setLossTolerance(event.target.value);
    // Example validation: Required field and numeric value
    setLossToleranceError(event.target.value === '' || isNaN(event.target.value));
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
    // Example validation: Required field
    setUnitError(event.target.value === '');
  };


  
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Add New Item"}</DialogTitle>
      <DialogContent>
        <form noValidate>
          <Stack spacing={2}>
            <Box>
              <TextField
                sx={{ width: 500, marginTop: '10px' }}
                label='Name'
                type='text'
                value={name}
                onChange={handleNameChange}
                error={nameError}
                helperText={nameError ? 'Name is required' : ''}
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: 500 }}
                label='Category'
                type='text'
                value={category}
                onChange={handleCategoryChange}
                // Add error and helperText props for category field if needed
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: 500 }}
                label='Loss Tolerance'
                type='number'
                value={lossTolerance}
                onChange={handleLossToleranceChange}
                // Add error and helperText props for lossTolerance field if needed
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: 500 }}
                label='Unit'
                type='text'
                value={unit}
                onChange={handleUnitChange}
                // Add error and helperText props for unit field if needed
              />
            </Box>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'end', gap: '30px', margin: '20px' }}>
        <Button style={{ color: 'black' }} onClick={handleCancel}>Cancel</Button>
        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddItemDialog
