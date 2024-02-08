import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
//components
import Navbar from '../Shared/Navbar'
import Sidebar from '../Sidebar/Sidebar'
//pages
import DashboardPage from '../../pages/RestaurantOwner/Dashboard/DashboardPage'
import MenuPage from '../../pages/RestaurantOwner/Menu/MenuPage'

const RouterRestaurantOwner = () => {

    const Layout = () => {
        return (
            <>
                <Navbar isLogin={true} />
                <div className='row' style={{ display: 'flex' }}>
                    <Sidebar />
                    <Outlet />
                </div>
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/menu" element={<MenuPage />} />
            </Route>
        </Routes>
    )
}

export default RouterRestaurantOwner