import React, { useState } from 'react'

const AdminLoginPage = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <input type="text" placeholder='User name' value={userName} onChange={(e)=> setUserName(e.target.value)}/>
            <input type="text" placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </>
    )
}

export default AdminLoginPage