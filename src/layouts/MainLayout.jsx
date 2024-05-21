import React from 'react'
import { Outlet } from 'react-router-dom'
import SideDrawer from '../components/SideDrawer'



const MainLayout = () => {
  return (
    <div style={{display: 'flex'}}>
        <SideDrawer/>
        <Outlet style={{flex: 1}} />
    </div>
  )
}



export default MainLayout
