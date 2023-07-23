//ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom"
//COMPONENTS
import Navbar from "./Navbar"
//PAGES
import HomePage from "../pages/Home/HomePage"
import LoginPage from "../pages/Login/LoginPage"
import MainPage from "../pages/Main/MainPage"
import RegistrationPage from "../pages/Register/RegistrationPage"
import RestaurantDetailsPage from "../pages/RestaurantDetails/RestaurantDetailsPage"
import AdminLoginPage from "../administration/AdminLoginPage"
import AdminPanel from "../administration/AdminPanel"


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/*USER*/}
                <Route path="/" element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="home/:user" element={<HomePage />} />
                <Route path="restaurant/:restaurant" element={<RestaurantDetailsPage />} />
                {/*ADMIN*/}
                <Route path="admin-login" element={<AdminLoginPage />} />
                <Route path="admin-panel" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    )
}