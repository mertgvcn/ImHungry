//router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//pages
import LoginPage from '../../pages/Login/LoginPage'
import MainPage from '../../pages/Main/MainPage'
import RegistrationPage from '../../pages/Register/RegistrationPage'


const RouterGuest = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
            </Routes>
        </>
    )
}

export default RouterGuest