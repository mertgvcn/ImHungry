import React from 'react'
import { useState } from "react"
//COMPONENTS
import Alert from "../../../components/Shared/Alert"
//EXPORTED FUNCTIONS
import { Encode } from '../../../setup/Crypto/Cryption'
import { register, isUserNameAlreadyExists } from '../../../setup/API/user_api'
//CSS
import "../styles/Register.css"

const Register = () => {

    //*REGISTRATION INPUTS
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userName, setUserName] = useState<string>("");

    //*ALERT PROPERTIES
    const [color, setColor] = useState<any>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    
    //*FUNCTIONS
    //OnClick Handlers
    const createUser = async () => {
        if(await isInputsValid() == false) {
            return;
        }

        const encodedPass = Encode(password)

        await register(firstName,lastName,userName,email,phoneNumber,encodedPass);
        popAlert("green", "Registration successful")
        window.location.href = "/"
    }

    const goLogin = () => {
        window.location.href = "/login"
    }

    //Support functions
    const isInputsValid = async () => {
        if (firstName.trim() == "" || lastName.trim() == "" || email.trim() == "" || userName.trim() == "" || phoneNumber.trim() == "") {
            popAlert("orange", "Please dont leave blank spaces")
            return false;
        }

        if(await isUserNameAlreadyExists(userName)) {
            popAlert("orange", "Username must be unique")
            return false;
        }

        if (!(email.includes("@") && email.endsWith(".com"))) {
            popAlert("orange", "Please enter a valid mail")
            return false;
        }

        if (phoneNumber.length != 11) {
            popAlert("orange", "Please enter a valid phone number : 05xxxxxxxxx")
            return false;
        }

        if (password.trim().length < 8) {
            popAlert("orange", "Password must be at least 8 characters")
            return false;
        } else if (!stringHasNumber(password)) {
            popAlert("orange", "Password must contain at least one numeric value")
            return false;
        }

        return true;
    }

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
                            <input className='input-text' type="text"
                                value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="input-template">
                            <p className="input-label">Last Name</p>
                            <input className='input-text' type="text"
                                value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    {/*Other Inputs*/}
                    <div className="input-template">
                        <p className="input-label">User Name</p>
                        <input className='input-text' type="text"
                            value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="input-template">
                        <p className="input-label">Email</p>
                        <input className='input-text' type="text"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-template">
                        <p className="input-label">Phone Number</p>
                        <input className='input-text' type="text"
                            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="input-template">
                        <p className="input-label">Password</p>
                        <input className='input-text' type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>


                </div>

                <div id='register-buttons-wrapper'>
                    <input className='input-button' id='register' type="button"
                        value="Register" onClick={createUser} />
                    <input className='input-button' id='ihaveaccount' type="button"
                        value="I already have an account" onClick={goLogin} />
                </div>
            </div>
        </>

    )
}

// function stringHasNumber(text: String) {
//     if (!(text.includes("1") && text.includes("2") && text.includes("3") && text.includes("4") && text.includes("5") &&
//         text.includes("6") && text.includes("7") && text.includes("8") && text.includes("9") && text.includes("0"))) {
//         return false;
//     }
//     return true;
// }

function stringHasNumber(text: string): boolean { //yukarıdaki fonksiyonla aynı işlevi görüyor.
    return /\d/.test(text);
}

export default Register