import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      id="input-with-icon-textfield"
      size='small'
      label='Search'
      style={{ width: '300px' }}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
};

export default SearchBar;
