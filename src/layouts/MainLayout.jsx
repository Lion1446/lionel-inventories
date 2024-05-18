import React from 'react'
import SideNavBar from '../components/SideNavBar/SideNavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div style={{display: 'flex'}}>
        <SideNavBar />
        <Outlet style={{flex: 1}} />
    </div>
  )
}



export default MainLayout
