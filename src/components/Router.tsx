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


export default function Router() {
    return (
        <BrowserRouter>
        <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="home/:user" element={<HomePage />} />
                <Route path="restaurant/:restaurant" element={<RestaurantDetailsPage/>}/>
        </Routes>
    </BrowserRouter>
    )
}