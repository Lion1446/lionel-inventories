import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const Transition = React.forwardRef(function Transition(props, ref) {
  
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditItemDialog = ({open, handleCancelButton, handleSubmitButton, data}) => {
  const schema = yup.object({
    item: yup.string().required("This field is required"),
    category: yup.string().required("This field is required"), 
    lossTolerance: yup.number().required("This field is required"),
    unit: yup.string().required("This field is required") 
  })

  const form = useForm({
    defaultValues: {
      item: data.item,
      category: data.category,
      lossTolerance: data.lossTolerance,
      unit: data.unit
    },
    resolver: yupResolver(schema)
  });

  const {register, handleSubmit, formState} = form;

  const {errors} = formState;
  const onSubmit = (updateData) => {
    for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
            data[key] = updateData[key];
        }
    }
    handleSubmitButton(data);
  }


  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancelButton}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Edit Item"}</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Box>
              <TextField
                sx={{ width: 500, marginTop: '10px' }}
                label='Name'
                type='text'
                {...register('item')}
                error = {!!errors.item}
                helperText={errors.item?.message}
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: 500 }}
                label='Category'
                type='text'
                {...register('category')}
                error = {!!errors.category}
                helperText={errors.category?.message}
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: 500 }}
                label='Loss Tolerance'
                type='number'
                {...register('lossTolerance')}
                error = {!!errors.lossTolerance}
                helperText={errors.lossTolerance?.message}
              />
            </Box>
            <Box>
              <TextField
                sx={{ width: 500 }}
                label='Unit'
                type='text'
                {...register('unit')}
                error = {!!errors.unit}
                helperText={errors.unit?.message}
              />
            </Box>
          </Stack>
          <DialogActions style={{ justifyContent: 'end', gap: '30px', margin: '20px' }}>
          <Button style={{ color: 'black' }} onClick={handleCancelButton}>Cancel</Button>
          {/* <Button type='submit' variant='contained' onClick={() => handleSubmit({name, category, lossTolerance, unit})}>Submit</Button> */}
          <Button type='submit' variant='contained'>Submit</Button>
      </DialogActions>
        </form>
      </DialogContent>
      
    </Dialog>
  )
}

export default EditItemDialog
