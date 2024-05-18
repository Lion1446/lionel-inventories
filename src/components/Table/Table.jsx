import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
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
                <IconButton onClick={() => handleEdit(params.id)}>
                    <EditIcon color="#ACACAC" />
                </IconButton>
                <IconButton onClick={() => handleDelete(params.id)}>
                    <DeleteIcon color="#ACACAC" />
                </IconButton>
            </>
        ),
    },
];

const rows = [
    { id: 1, sku: 'ING-001', item: 'Tomatoes', category: 'Vegetables', lossTolerance: 2, unit: 'kg' },
    { id: 2, sku: 'ING-002', item: 'Olive Oil', category: 'Oils', lossTolerance: 1, unit: 'liters' },
    { id: 3, sku: 'ING-003', item: 'Salt', category: 'Spices', lossTolerance: 1, unit: 'kg' },
    { id: 4, sku: 'ING-004', item: 'Chicken Breast', category: 'Meat', lossTolerance: 3, unit: 'kg' },
    { id: 5, sku: 'ING-005', item: 'Basil', category: 'Herbs', lossTolerance: 5, unit: 'grams' },
    { id: 6, sku: 'ING-006', item: 'Parmesan Cheese', category: 'Dairy', lossTolerance: 2, unit: 'kg' },
    { id: 7, sku: 'ING-007', item: 'Garlic', category: 'Vegetables', lossTolerance: 4, unit: 'kg' },
    { id: 8, sku: 'ING-008', item: 'Black Pepper', category: 'Spices', lossTolerance: 1, unit: 'kg' },
    { id: 9, sku: 'ING-009', item: 'Lemon Juice', category: 'Fruits', lossTolerance: 3, unit: 'liters' },
    { id: 10, sku: 'ING-010', item: 'Butter', category: 'Dairy', lossTolerance: 2, unit: 'kg' },
    { id: 11, sku: 'ING-011', item: 'Onions', category: 'Vegetables', lossTolerance: 3, unit: 'kg' },
    { id: 12, sku: 'ING-012', item: 'Carrots', category: 'Vegetables', lossTolerance: 2, unit: 'kg' },
    { id: 13, sku: 'ING-013', item: 'Cucumber', category: 'Vegetables', lossTolerance: 4, unit: 'kg' },
    { id: 14, sku: 'ING-014', item: 'Mint', category: 'Herbs', lossTolerance: 5, unit: 'grams' },
    { id: 15, sku: 'ING-015', item: 'Thyme', category: 'Herbs', lossTolerance: 4, unit: 'grams' },
    { id: 16, sku: 'ING-016', item: 'Yogurt', category: 'Dairy', lossTolerance: 2, unit: 'liters' },
    { id: 17, sku: 'ING-017', item: 'Honey', category: 'Sweeteners', lossTolerance: 1, unit: 'liters' },
    { id: 18, sku: 'ING-018', item: 'Almonds', category: 'Nuts', lossTolerance: 3, unit: 'kg' },
    { id: 19, sku: 'ING-019', item: 'Cashews', category: 'Nuts', lossTolerance: 2, unit: 'kg' },
    { id: 20, sku: 'ING-020', item: 'Brown Sugar', category: 'Sweeteners', lossTolerance: 1, unit: 'kg' },
    { id: 21, sku: 'ING-021', item: 'Baking Powder', category: 'Baking', lossTolerance: 1, unit: 'kg' },
    { id: 22, sku: 'ING-022', item: 'Baking Soda', category: 'Baking', lossTolerance: 1, unit: 'kg' },
    { id: 23, sku: 'ING-023', item: 'Milk', category: 'Dairy', lossTolerance: 2, unit: 'liters' },
    { id: 24, sku: 'ING-024', item: 'Cream', category: 'Dairy', lossTolerance: 2, unit: 'liters' },
    { id: 25, sku: 'ING-025', item: 'Eggs', category: 'Poultry', lossTolerance: 3, unit: 'dozen' },
    { id: 26, sku: 'ING-026', item: 'Flour', category: 'Baking', lossTolerance: 2, unit: 'kg' },
    { id: 27, sku: 'ING-027', item: 'Rice', category: 'Grains', lossTolerance: 2, unit: 'kg' },
    { id: 28, sku: 'ING-028', item: 'Pasta', category: 'Grains', lossTolerance: 2, unit: 'kg' },
    { id: 29, sku: 'ING-029', item: 'Soy Sauce', category: 'Condiments', lossTolerance: 1, unit: 'liters' },
    { id: 30, sku: 'ING-030', item: 'Vinegar', category: 'Condiments', lossTolerance: 1, unit: 'liters' },
    { id: 31, sku: 'ING-031', item: 'Mustard', category: 'Condiments', lossTolerance: 1, unit: 'kg' },
    { id: 32, sku: 'ING-032', item: 'Ketchup', category: 'Condiments', lossTolerance: 1, unit: 'kg' },
    { id: 33, sku: 'ING-033', item: 'Corn', category: 'Vegetables', lossTolerance: 3, unit: 'kg' },
    { id: 34, sku: 'ING-034', item: 'Peas', category: 'Vegetables', lossTolerance: 3, unit: 'kg' },
    { id: 35, sku: 'ING-035', item: 'Broccoli', category: 'Vegetables', lossTolerance: 2, unit: 'kg' },
    { id: 36, sku: 'ING-036', item: 'Cauliflower', category: 'Vegetables', lossTolerance: 2, unit: 'kg' },
    { id: 37, sku: 'ING-037', item: 'Bell Pepper', category: 'Vegetables', lossTolerance: 3, unit: 'kg' },
    { id: 38, sku: 'ING-038', item: 'Spinach', category: 'Vegetables', lossTolerance: 4, unit: 'kg' },
    { id: 39, sku: 'ING-039', item: 'Lettuce', category: 'Vegetables', lossTolerance: 4, unit: 'kg' },
    { id: 40, sku: 'ING-040', item: 'Mushrooms', category: 'Vegetables', lossTolerance: 3, unit: 'kg' },
    { id: 41, sku: 'ING-041', item: 'Strawberries', category: 'Fruits', lossTolerance: 2, unit: 'kg' },
    { id: 42, sku: 'ING-042', item: 'Blueberries', category: 'Fruits', lossTolerance: 2, unit: 'kg' },
    { id: 43, sku: 'ING-043', item: 'Apples', category: 'Fruits', lossTolerance: 3, unit: 'kg' },
    { id: 44, sku: 'ING-044', item: 'Bananas', category: 'Fruits', lossTolerance: 3, unit: 'kg' },
    { id: 45, sku: 'ING-045', item: 'Oranges', category: 'Fruits', lossTolerance: 2, unit: 'kg' },
];

const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
};

const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
};

const Table = () => {
    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default Table;
