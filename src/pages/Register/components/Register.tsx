import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
//helpers
import { RegisterUserAsync } from '../../../setup/API/auth_api'
import { Encrypt } from '../../../setup/Cryption'
import { usePopAlert } from '../../../hooks/usePopAlert'
//css
import "../styles/Register.css"
//components
import Alert from "../../../components/Shared/Alert"
//models
import { UserRegisterRequest } from '../../../models/ParameterModels/AuthParameterModels'



const emailPattern = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const phoneNumberPattern = new RegExp(/^(\+90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\(\d{3}\)[\s-]*\d{3}[\s-]*\d{4}|\(\d{3}\)[\s-]*\d{7}|\d{3}[\s-]*\d{3}[\s-]*\d{4}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2})$/);
const passwordPattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(\S).{8,20}$/)


const Register = () => {
    const navigate = useNavigate() 

    //States
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        username: ""
    })
    const [errors, setErrors] = useState<any>({})
    const {alertStates, popAlert} = usePopAlert()


    //Functions
    const handleChange = (e: any) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const createUser = async () => {
        if (await Validation()) {
            const encryptedPass = Encrypt(formData.password)
            const registerParams: UserRegisterRequest = {
                FirstName: formData.firstName,
                LastName: formData.lastName,
                Username: formData.username,
                Email: formData.email,
                PhoneNumber: formData.phoneNumber,
                Password: encryptedPass,
            }
            const response = await RegisterUserAsync(registerParams)

            if(response.isSuccess) {
                resetInputs()
                popAlert("green", "Registration successful")
                setTimeout(() => {
                    navigate("/login")
                }, 2000)
            }
            else {
                popAlert("red", response.ErrorMessage)
            }
        }
    }


    //Support functions
    const Validation = async () => {
        let isValid = true
        const validationErrors: any = {}

        //firstname
        if (!formData.firstName.trim()) {
            validationErrors.firstName = "*Required"
        }
        else if (formData.firstName.trim().length < 2 || formData.firstName.trim().length > 25) {
            validationErrors.firstName = "*First name must be between 2-25 characters"
        }

        //lastname
        if (!formData.lastName.trim()) {
            validationErrors.lastName = "*Required"
        }
        else if (formData.lastName.trim().length < 2 || formData.lastName.trim().length > 25) {
            validationErrors.lastName = "*Last name must be between 2-25 characters"
        }

        //username
        if (!formData.username.trim()) {
            validationErrors.username = "*Required"
        }
        else if (formData.username.trim().length < 4 || formData.username.trim().length > 25) {
            validationErrors.username = "*Username must be between 4-25 characters"
        }

        //email
        if (!formData.email.trim()) {
            validationErrors.email = "*Required"
        }
        else if (!emailPattern.test(formData.email)) {
            validationErrors.email = "*Invalid email"
        }

        //phonenumber
        if (!formData.phoneNumber.trim()) {
            validationErrors.phoneNumber = "*Required"
        }
        else if (!phoneNumberPattern.test(formData.phoneNumber)) {
            validationErrors.phoneNumber = "*Invalid phone number"
        }

        //password
        if (!formData.password.trim()) {
            validationErrors.password = "*Required"
        }
        else if (!passwordPattern.test(formData.password)) {
            validationErrors.password = "*Password must contain at least 8 characters, 1 capital letter and 1 number"
        }

        if (Object.keys(validationErrors).length != 0) {
            isValid = false
            setErrors(validationErrors)
        }

        return isValid
    }

    const resetInputs = () => {
        setErrors({})
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            username: ""
        })
    }


    return (
        <>
            <Alert isOpen={alertStates.isOpen} color={alertStates.color} msg={alertStates.msg} />

            <div id='register-wrapper'>
                <div id='register-title-wrapper'>
                    <p id="register-title">Join Us</p>
                    <hr id="register-hr-line" />
                </div>

                <div id='register-inputs-wrapper'>
                    {/*First Name - Last Name*/}
                    <div id="input-full-name">
                        <div className="input-template">
                            <p className="input-label">First Name</p>
                            <input className='input-text' type="text" name="firstName" onChange={handleChange} />
                            <div className='error-message'>
                                {errors.firstName && <span>{errors.firstName}</span>}
                            </div>
                        </div>
                        <div className="input-template">
                            <p className="input-label">Last Name</p>
                            <input className='input-text' type="text" name="lastName" onChange={handleChange} />
                            <div className='error-message'>
                                {errors.lastName && <span>{errors.lastName}</span>}
                            </div>
                        </div>
                    </div>

                    {/*Other Inputs*/}
                    <div className="input-template">
                        <p className="input-label">Username</p>
                        <input className='input-text' type="text" name="username" onChange={handleChange} />
                        <div className='error-message'>
                            {errors.username && <span>{errors.username}</span>}
                        </div>
                    </div>
                    <div className="input-template">
                        <p className="input-label">Email</p>
                        <input className='input-text' type="text" name="email" onChange={handleChange} />
                        <div className='error-message'>
                            {errors.email && <span>{errors.email}</span>}
                        </div>
                    </div>
                    <div className="input-template">
                        <p className="input-label">Phone Number</p>
                        <input className='input-text' type="text" name="phoneNumber" onChange={handleChange} />
                        <div className='error-message'>
                            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                        </div>
                    </div>
                    <div className="input-template">
                        <p className="input-label">Password</p>
                        <input className='input-text' type="password" name="password" onChange={handleChange} />
                        <div className='error-message'>
                            {errors.password && <span>{errors.password}</span>}
                        </div>
                    </div>


                </div>

                <div id='register-buttons-wrapper'>
                    <input className='input-button' id='register' type="button"
                        value="Register" onClick={createUser} />

                    <input className='input-button' id='ihaveaccount' type="button"
                        value="I already have an account" onClick={() => navigate("/login")} />
                </div>
            </div>
        </>

    )
}

export default Register