import React from 'react'
//COMPONENTS
import Navbar from "../../components/Navbar"
import Login from "./components/Login"
//CSS
import './styles/LoginPage.css'

function LoginPage () {
    
    return (
        <div className='login-page-background'>
            <Navbar/>
            <Login/>
        </div>
    )
}

export default LoginPage