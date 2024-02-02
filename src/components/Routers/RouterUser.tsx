import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
//pages
import HomePage from '../../pages/User/Home/HomePage'
import ProfilePage from '../../pages/User/Profile/ProfilePage'
import RestaurantDetailsPage from '../../pages/User/RestaurantDetails/RestaurantDetailsPage'
import PaymentPage from '../../pages/User/Payment/PaymentPage'
import Navbar from '../Shared/Navbar'

const RouterUser = () => {

    const Layout = () => {
        return (
            <>
                <Navbar isLogin={true} />
                <Outlet />
            </>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/restaurant" element={<RestaurantDetailsPage />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Route>
        </Routes>
    )
}

export default RouterUser