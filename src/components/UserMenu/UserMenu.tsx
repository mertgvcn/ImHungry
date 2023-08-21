import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
//CSS
import './styles/UserMenu.css'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = (props: propsType) => {
    const { setCartItemAmount } = useContext(CartContext)
    const { setCurrentUserID, setIsLogin } = useContext(UserContext)

    const handlePreviousOrders = () => {

    }

    const handleAccountSettings = () => {
        window.location.href = "/profile"
    }

    const handleLogOut = () => {
        setCurrentUserID("")
        setIsLogin("false")
        setCartItemAmount("")
        window.location.href = "/"
    }

    return props.trigger ? (
        <>
            <div className='user-menu'>
                <div className="user-menu-buttons-wrapper">
                    <button onClick={handlePreviousOrders}>
                        <i className="fa-solid fa-boxes-stacked"></i>
                        <p>Previous Orders</p>
                    </button>
                    <button onClick={handleAccountSettings}>
                        <i className="fa-solid fa-gear"></i>
                        <p>Account Settings</p>
                    </button>
                    <button onClick={handleLogOut}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <p>Log Out</p>
                    </button>
                </div>
            </div>
        </>

    ) : null
}

export default UserMenu