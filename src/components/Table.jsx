import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteIngredient, editIngredient } from '../services/ingredients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DeleteItemDialog from './DeleteItemDialog';
import EditItemDialog from './EditItemDialog';

const Table = ({ data, page }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const queryClient = useQueryClient();

  const handleOpenEdit = (id, row) => {
    setSelectedRow(row);
    setOpenEdit(true);
    setSelectedID(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedRow(null);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedID(id);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    setSelectedID(null);
  };

  const mutationDelete = useMutation({
    mutationFn: deleteIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      handleCloseConfirmation();
    },
    onError: (error) => {
      console.log(error.message);
    }
  });

  const mutationEdit = useMutation({
    mutationFn: editIngredient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ingredients'] });
      handleCloseEdit();
    },
    onError: (error) => {
    //   console.log(error.message);
    }
  });

  const handleDeleteIngredient = () => {
    mutationDelete.mutate(selectedID);
  };

  const handleEditIngredient = (data) => {
    console.log(data);
    mutationEdit.mutate(data);
  }
  
  const columns = (page == "ingredients") ? [
    { field: 'sku', headerName: 'SKU', flex: 1 },
    { field: 'item', headerName: 'ITEM', flex: 2 },
    { field: 'category', headerName: 'CATEGORY', flex: 1 },
    { field: 'lossTolerance', headerName: 'LOSS TOLERANCE', flex: 1 },
    { field: 'unit', headerName: 'UNIT', flex: 1 },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      flex: 1,
      renderCell: (params) => (
      <>
        <IconButton onClick={() => handleOpenEdit(params.id, params.row)}>
        <EditIcon style={{ color: '#ACACAC' }} />
        </IconButton>
        <IconButton onClick={() => handleDeleteConfirmation(params.id)}>
        <DeleteIcon style={{ color: '#ACACAC' }} />
        </IconButton>
      </>
      ),
    },
    ] 
    :[
        { field: 'sku', headerName: 'SKU', flex: 1 },
        { field: 'name', headerName: 'ITEM', flex: 2 },
        { field: 'category', headerName: 'CATEGORY', flex: 1 },
        { field: 'price', headerName: 'PRICE', flex: 1 },
        // { field: 'i', headerName: 'TOTAL', flex: 1 },
        {
            field: 'actions',
            headerName: 'ACTIONS',
            flex: 1,
            renderCell: (params) => (
            <>
                <IconButton onClick={() => handleOpenEdit(params.id, params.row)}>
                <EditIcon style={{ color: '#ACACAC' }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteConfirmation(params.id)}>
                <DeleteIcon style={{ color: '#ACACAC' }} />
                </IconButton>
            </>
            ),
        },
    ];
  
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid rows={data} columns={columns} />
      {selectedRow && (
        <EditItemDialog
          open={openEdit}
          handleSubmitButton={handleEditIngredient}
          handleCancelButton={handleCloseEdit}
          data={selectedRow}
          id={selectedID}
        />
      )}
      <DeleteItemDialog
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirm={handleDeleteIngredient}
      />
    </div>
  );
};



export default Table;