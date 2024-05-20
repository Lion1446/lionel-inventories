import { Button, Typography } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


const CreateProductPage = () => {


  return (
    <div className='content-section'>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
            <Link to="/products"><ArrowBackIcon style={{color: 'black'}}/></Link>
            <Typography variant='h5'>Create Product</Typography>
        </div>
            <Button type='submit' variant="contained">Submit</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default CreateProductPage
