import React, { useState } from 'react'
//API
import { searchEmail } from '../../../setup/API/user_api';
//CSS
import '../styles/IForgotMyPassword.css'
//TYPE
import { IForgotMyPassType } from '../../../types/IForgotMyPassType';
//COMPONENT
import Alert from '../../../components/Alert';



const IForgotMyPassword = (props: IForgotMyPassType) => {
    const [email, setEmail] = useState<string>("");

    //*ALERT PROPERTIES
    const [color, setColor] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    //*FUNCTIONS
    //OnClick Handlers
    const handleSend = async () => {
        if(email.trim() === "") {
            popAlert("orange", "Email is blank");
            return;
        }    
        if (!(email.includes("@") && email.endsWith(".com"))) {
            popAlert("orange", "Please enter a valid mail")
            return;
        }

        if(await searchEmail(email)) {
            popAlert("green", "We sent your new password to your email adress!")
        }else {
            popAlert("red", "This email is not registered!")
        }
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

    return (props.trigger) ? (
        <div className='iforgotmypass-background'>
            <Alert isOpen={isOpen} color={color} msg={msg} />
            <div className='iforgotmypass-wrapper'>
                <div className='title'>
                    I Forgot My Password
                </div>

                <p className='info'> We will send your new password to your email </p>
                <div className="input-group">
                    <input className="input-email" type="text" placeholder='Enter Email Adress' 
                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                           
                    <input className="input-send" type="submit" 
                           value="Send" onClick={handleSend} />
                </div>

                <a className="back-to-login" onClick={() => {props.setTrigger(false); setEmail("");}}>back to login</a>
            </div>
        </div>
    ) : null;
}

export default IForgotMyPassword