import React from 'react'
import { useState } from "react"
//EXPORTED FUNCTIONS
import { login } from '../../../setup/API/user_api'
import { Encode } from '../../../setup/Crypto/Encryption'
//COMPONENTS
import IForgotMyPassword from './IForgotMyPassword'
import Alert from '../../../components/Alert'
//CSS
import "../styles/Login.css"





const Login = () => {

    //*LOGIN INPUTS
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    //*ALERT PROPERTIES
    const [color, setColor] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //*IFORGOTMYPASSWORD 
    const [iForgotMyPass, setIForgotMyPass] = useState<boolean>(false);


    //*FUNCTIONS
    //OnClick Handlers
    const handleLogin = async () => {
        if (userName.trim() == "" || password.trim() == "") {
            popAlert("orange", "Username or password cannot be left blank!")
            return;
        }

        const encodedPass = Encode(password);
        
        if(await login(userName, encodedPass) == false) {
            popAlert("red", "User name or password is wrong!")
        }   
        else { //LOGIN SUCCESSFUL
            popAlert("green", "Login successful!")
            window.location.href = `home/${userName}`
            return;       
        }         
    }

    const handleRegister = () => {
        window.location.href = "/registration"
    }

    //Support functions
    const popAlert = (color: string, msg: string) => {
        setIsOpen(true)
        setColor(color)
        setMsg(msg)

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }

    return (
        <>
            <Alert isOpen={isOpen} color={color} msg={msg}/>

            <div id='login-wrapper'>
                <div id='login-title'>
                    <p>Login</p>
                    <hr id="login-hr-line"/>
                </div>

                <div id='login-inputs-wrapper'>
                    <div className="input-template">
                        <p className="input-label">User Name</p>
                        <input className='input-text' type="text"
                            value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className="input-template">
                        <p className="input-label">Password</p>
                        <input className='input-text' type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div id='login-buttons-wrapper'>
                    <input className='input-button' id='login' type="button"
                        value="Login" onClick={handleLogin} />
                    <input className='input-button' id='register' type="button"
                        value="Register" onClick={handleRegister} />
                    <input className='input-button' id='forgotpassword' type="button"
                        value="I forgot my password" onClick={()=>setIForgotMyPass(true)} />
                </div>
            </div>

            <IForgotMyPassword trigger={iForgotMyPass} setTrigger={setIForgotMyPass}/>
        </>

    )
}

export default Login