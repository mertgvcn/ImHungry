import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
//pages
import DashboardPage from '../../pages/Dashboard/DashboardPage'
import Navbar from '../Shared/Navbar'

const RouterRestaurantOwner = () => {
    const Layout = () => {
        return (
            <>
                <Navbar isLogin={true}/>
                <Outlet />
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>
    )
}

export default RouterRestaurantOwner