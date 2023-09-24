import React, { useState } from 'react'
//EXPORTED FUNCTIONS
import { adminLogin } from '../setup/API/admin_api';
import { Encrypt } from '../setup/Cryption';
//CSS
import './styles/AdminLoginPage.css'

const AdminLoginPage = () => {
    const [adminName, setAdminName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {
        const encryptedPass = Encrypt(password);

        if(await adminLogin(adminName, encryptedPass)) {
            window.location.href = "/admin-panel"
        }else {
            console.log(false)
        }
    }

    return (
        <div className='admin-login-background'>
            <h1>ADMIN LOGIN</h1>
            <input type="text" placeholder='User name' value={adminName} onChange={(e)=> setAdminName(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <input type='button' value="Login" onClick={handleLogin}/>
        </div>
    )
}

export default AdminLoginPage