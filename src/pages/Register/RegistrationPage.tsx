import React from 'react'
//COMPONENTS
import Navbar from "../../components/Navbar"
import Register from "./components/Register"
//CSS
import './styles/RegistrationPage.css'

function RegistrationPage() {
  return (
    <div className='registration-page-background'>
        <Navbar/>
        <Register/>
    </div>
  )
}

export default RegistrationPage