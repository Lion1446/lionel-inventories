import React from 'react'
import './style.css';
import { NavLink } from 'react-router-dom';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const linkClass = ({ isActive }) =>
    isActive ? 'active' : 'inactive';
    
const SideNavBar = () => {
  return (
    <div className='sidenavbar' >
        <img src="/logo.png" alt="logo.png" />
        <div className='nav-item-group'>
          <NavLink to="/" end className={`nav-item ${linkClass}`}>
            <KitchenOutlinedIcon/>
            Ingredients
          </NavLink>        
          <NavLink to="/products" end className={`nav-item ${linkClass}`}>
            <ShoppingBasketOutlinedIcon/>
            Products
          </NavLink>       
          <NavLink to="/sales-and-audit" end className={`nav-item ${linkClass}`}>
            <ReceiptLongOutlinedIcon/>
            Sales and Audit
          </NavLink>       
          <NavLink to="/inventory" end className={`nav-item ${linkClass}`}>
            <Inventory2OutlinedIcon/>
            Inventory
          </NavLink>      
        </div>   
    </div>
  )
}

export default SideNavBar
