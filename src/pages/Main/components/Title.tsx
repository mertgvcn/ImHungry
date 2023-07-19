import React from 'react'
import '../styles/Title.css'

const Title = () => {

  const handleLogin = () => {
    window.location.href = "/login"
  }

  const handleRegister = () => {
    window.location.href = "/registration"
  }

  return (
    <>
        <div className="container">        
          <p id="text-welcome">Welcome to Im Hungry</p>
          <p id="text-info">-if you are feeling hungry log in or join us-</p>
          <div id="button-wrapper">
            <input className="input-button" id="login" value="Login" type="submit" onClick={handleLogin}/>
            <input className="input-button" id="register" value="Register" type="submit" onClick={handleRegister}/>
          </div>
        </div>
    </>
  )
}

export default Title