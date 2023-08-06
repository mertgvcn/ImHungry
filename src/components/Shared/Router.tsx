//ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom"
//CONTEXT
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
//PAGES
import HomePage from "../../pages/Home/HomePage"
import LoginPage from "../../pages/Login/LoginPage"
import MainPage from "../../pages/Main/MainPage"
import RegistrationPage from "../../pages/Register/RegistrationPage"
import RestaurantDetailsPage from "../../pages/RestaurantDetails/RestaurantDetailsPage"
import AdminLoginPage from "../../administration/AdminLoginPage"
import AdminPanel from "../../administration/AdminPanel"
import ProfilePage from "../../pages/Profile/ProfilePage"
import PaymentPage from "../../pages/Payment/PaymentPage"



export default function Router() {
    const {isLogin} = useContext(UserContext)
    const _isLogin = (isLogin === 'true')

    return (
        <BrowserRouter>
            <Routes>
                {/*USER*/}
                <Route path="/" element={_isLogin ? <HomePage/> : <MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/home" element={_isLogin ? <HomePage /> : <LoginPage/>} />
                <Route path="/profile" element={_isLogin ? <ProfilePage /> : <LoginPage/>}/>
                <Route path="/restaurant" element={_isLogin ? <RestaurantDetailsPage /> : <LoginPage/>} />
                <Route path="/payment" element={_isLogin ? <PaymentPage/> : <LoginPage/>}/>
                {/*ADMIN*/}
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
            </Routes>
        </BrowserRouter>
    )
}