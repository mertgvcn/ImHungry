import React, { useContext, useEffect, useState } from 'react'
//EXPORTED FUNCTIONS
import { getIDByUserName, login } from '../../../setup/API/user_api'
import { Encrypt } from '../../../setup/Crypto/Cryption'
import { UserContext } from '../../../context/UserContext'
//COMPONENTS
import IForgotMyPassword from './IForgotMyPassword'
import Alert from '../../../components/Shared/Alert'
//CSS
import "../styles/Login.css"




const Login = () => {
    const { setIsLogin, setCurrentUserID } = useContext(UserContext)

    //LOGIN INPUTS
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    })
    const [errors, setErrors] = useState<any>({})

    //IFORGOTMYPASSWORD 
    const [iForgotMyPass, setIForgotMyPass] = useState<boolean>(false);


    const handleChange = (e: any) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const handleLogin = async () => {
        if (await Validation()) {
            //set user that logged in as current user 
            const data = await getIDByUserName(formData.userName)
            const userID = data[0].userID.toString()
            const _currentUserID = Encrypt(userID)
            setCurrentUserID(_currentUserID)
            setIsLogin("true")

            //redirect to home page
            popAlert("green", "Login successful!")
            resetInputs()
            window.location.href = "home"
            return;
        }
    }

    const handleRegister = () => {
        window.location.href = "/registration"
    }

    //Support functions
    const Validation = async () => {
        let isValid = true
        const validationErrors: any = {}

        //username
        if (!formData.userName.trim()) {
            validationErrors.userName = "*Required"
        }

        //password
        if (!formData.password.trim()) {
            validationErrors.password = "*Required"
        }


        if (Object.keys(validationErrors).length != 0) {
            isValid = false
            setErrors(validationErrors)
        }
        else {
            const encryptedPass = Encrypt(formData.password);
            if (await login(formData.userName, encryptedPass) == false) {
                validationErrors.password = "*User name or password is wrong"
                isValid = false
                setErrors(validationErrors)
            }
        }

        return isValid
    }

    const resetInputs = () => {
        setErrors({})
        setFormData({
            userName: "",
            password: ""
        })
    }


    //ALERT PROPERTIES
    const [color, setColor] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
            <Alert isOpen={isOpen} color={color} msg={msg} />

            <div id='login-wrapper'>
                <div id='login-title'>
                    <p>Login</p>
                    <hr id="login-hr-line" />
                </div>

                <div id='login-inputs-wrapper'>
                    <div className="input-template">
                        <p className="input-label">Username</p>
                        <input className='input-text' name="userName" type="text" onChange={handleChange} />
                        <div>
                            {errors.userName && <span>{errors.userName}</span>}
                        </div>
                    </div>

                    <div className="input-template">
                        <p className="input-label">Password</p>
                        <input className='input-text' name="password" type="password" onChange={handleChange} />
                        <div>
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                    </div>
                </div>

                <div id='login-buttons-wrapper'>
                    <input className='input-button' id='login' type="button"
                        value="Login" onClick={handleLogin} />
                    <input className='input-button' id='register' type="button"
                        value="Register" onClick={handleRegister} />
                    <input className='input-button' id='forgotpassword' type="button"
                        value="I forgot my password" onClick={() => setIForgotMyPass(true)} />
                </div>
            </div>

            <IForgotMyPassword trigger={iForgotMyPass} setTrigger={setIForgotMyPass} />
        </>

    )
}

export default Login