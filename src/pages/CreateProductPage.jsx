import { Box, Button, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Table from '../components/Table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchIngredients } from '../services/ingredients.js';
import SearchbarWithDropdown from '../components/SearchBarWithDropdown.jsx';
import { addProduct } from '../services/products.js';
import { addProductIngredient } from '../services/productIngredient.js';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedIngredientObject, setSelectedIngredientObject] = useState(null);
  const [ingredientQuantity, setIngredientQuantity] = useState(1);
  const [selectedIngredientError, setSelectedIngredientError] = useState('');
  const [ingredientQuantityError, setIngredientQuantityError] = useState('');
  const queryClient = useQueryClient();

  const schema = yup.object({
    name: yup.string().required("This field is required"),
    category: yup.string().required("This field is required"), 
    price: yup.number().required("This field is required"),
  })

  const form = useForm({
    defaultValues: {
      name: '',
      category: '',
      price: 0,
    },
    resolver: yupResolver(schema)
  });

  const {register, handleSubmit, formState} = form;
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  });


  const {errors} = formState;

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      // console.log(data.data);
      ingredients.forEach((ingredient) => {
        const productIngredient = {
          productID: data.data.id,
          ingredientID: ingredient.id,
          quantity: ingredient.quantity
        }
        addProductIngredient(productIngredient)
      })
      addProductIngredient()
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/products');
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const handleAddIngredient = (newIngredient) => {
    mutation.mutate(newIngredient);
  }

  const onSubmit = async (data) => {
    handleAddIngredient(data);
  }

  if (isLoading) {
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

  const onSelectIngredient = (value) => {
    setSelectedIngredient(value);
    const ingredientToAdd = data.find(ingredient => ingredient.item.toLowerCase() === value.toLowerCase());
    setSelectedIngredientObject(ingredientToAdd);
  } 

  const onIngredientQuantityChange = (value) => {
    setIngredientQuantity(value)
  }

  const handleAddProductIngredient = () => {
    if (!selectedIngredientObject) {
      setSelectedIngredientError('Please select an ingredient');
    } else {
      setSelectedIngredientError('');
    }
    if (!ingredientQuantity || ingredientQuantity <= 0) {
      setIngredientQuantityError('Please enter a valid quantity');
    } else {
      setIngredientQuantityError('');
    }
    if (selectedIngredientObject && ingredientQuantity > 0){
      const updatedData = {
        ...selectedIngredientObject,
        quantity: ingredientQuantity
      };
      setIngredients((prevIngredients) => [...prevIngredients, updatedData]);
    }
  }

  return (
    <div className='content-section'>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
              <Link to="/products"><ArrowBackIcon style={{color: 'black'}}/></Link>
              <Typography variant='h5'>Create Product</Typography>
          </div>
          <Button type='submit' variant="contained">Submit</Button>
        </div>
        <div style={{display: 'flex', gap: '20px', margin: '20px 0px'}}>
          <TextField
            sx={{ width: 500, marginTop: '10px', flex: '5' }}
            label='Name'
            type='text'
            {...register('name')}
            error = {!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            sx={{ width: 500, marginTop: '10px', flex: '2' }}
            label='Category'
            type='text'
            {...register('category')}
            error = {!!errors.category}
            helperText={errors.category?.message}
          />
          <TextField
            sx={{ width: 500, marginTop: '10px', flex: '1' }}
            label='Price'
            type='number'
            {...register('price')}
            error = {!!errors.price}
            helperText={errors.price?.message}
          />
        </div>
      </form>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant='h5'>Ingredients</Typography>
          <div style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between'}}>
            <SearchbarWithDropdown errorFeedback={selectedIngredientError} data={data} handleOnChange={onSelectIngredient}/>
            <TextField
              label='Quantity'
              type='number'
              defaultValue={ingredientQuantity}
              onChange={(event) => {
                onIngredientQuantityChange(event.target.value);
              }}
              error={!!ingredientQuantityError}
              helperText={ingredientQuantityError}
            />
            <Button onClick={handleAddProductIngredient} type='button' variant="contained" startIcon={<AddIcon />}>Add Ingredient</Button>
          </div>
      </div>
      <Table page="product-ingredients" isLoading={isLoading} data={ingredients} />
    </div>
  )
}



export default CreateProductPage
