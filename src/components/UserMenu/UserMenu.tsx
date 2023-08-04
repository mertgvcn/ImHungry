import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
//CSS
import './styles/UserMenu.css'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = (props: propsType) => {
    const { setCurrentUserID, setIsLogin } = useContext(UserContext)

    const handlePreviousOrders = () => {
        
    }

    const handleAccountSettings = () => {
        window.location.href = "/profile"
    }

    const handleLogOut = () => {
        setCurrentUserID("")
        setIsLogin("false")
        window.location.href = "/"
    }

    return props.trigger ? (
        <>
            <div className='user-menu'>
                <div className="user-menu-buttons-wrapper">
                    <button onClick={handlePreviousOrders}>Previous Orders</button>
                    <button onClick={handleAccountSettings}>Account Settings</button>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </>

    ) : null
}

export default UserMenu