//router
import { Routes, Route, Outlet } from 'react-router-dom'
//components
import Navbar from '../Shared/Navbar'
//pages
import LoginPage from '../../pages/Guest/Login/LoginPage'
import MainPage from '../../pages/Guest/Main/MainPage'
import RegistrationPage from '../../pages/Guest/Register/RegistrationPage'


const RouterGuest = () => {

    const Layout = () => {
        return (
            <>
                <Navbar isLogin={false} />
                <Outlet />
            </>
        )
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/registration" element={<RegistrationPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default RouterGuest