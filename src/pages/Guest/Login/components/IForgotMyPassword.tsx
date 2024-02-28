import React, { useState } from 'react'
//helpers
import { VerifyEmail } from '../../../../setup/API/UserAPIs/user_api';
import { usePopAlert } from '../../../../hooks/usePopAlert';
//css
import '../styles/IForgotMyPassword.css'
//components
import Alert from '../../../../components/Shared/Alert';

type propsType = {
    trigger:boolean,
    setTrigger:React.Dispatch<React.SetStateAction<boolean>>
}

const IForgotMyPassword = (props: propsType) => {
    const [email, setEmail] = useState<string>("");
    const {alertStates, popAlert} = usePopAlert()

  
    const handleSend = async () => {
        if(email.trim() === "") {
            popAlert("orange", "Email is blank");
            return;
        }    
        if (!(email.includes("@") && email.endsWith(".com"))) {
            popAlert("orange", "Please enter a valid mail")
            return;
        }

        if(await VerifyEmail(email)) {
            popAlert("green", "We sent your new password to your email adress!")
        }else {
            popAlert("red", "This email is not registered!")
        }
    }


    return (props.trigger) ? (
        <div className='iforgotmypass-background'>
            <Alert isOpen={alertStates.isOpen} color={alertStates.color} msg={alertStates.msg} />
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