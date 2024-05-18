import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const SearchBar = () => {
  return (
    <TextField
        id="input-with-icon-textfield"
        size='small'
        label='Search'
        style={{ width: '300px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
  )
}

export default SearchBar
