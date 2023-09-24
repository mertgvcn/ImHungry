import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
//CSS
import './styles/UserMenu.css'
import { Link } from 'react-router-dom'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = (props: propsType) => {
    const { setCartItemAmount } = useContext(CartContext)
    const { setCurrentUserID, setIsLogin } = useContext(UserContext)

    const handlePreviousOrders = () => {}

    const handleLogOut = () => {
        setCurrentUserID("")
        setIsLogin("false")
        setCartItemAmount("")
        props.setTrigger(false)
    }

    return props.trigger ? (
        <>
            <div className='user-menu'>
                <div className="user-menu-buttons-wrapper">
                    <div>
                        <Link to="/orders" className='link' onClick={handlePreviousOrders}>
                            <i className="fa-solid fa-boxes-stacked"></i>
                            <p>Previous Orders</p>
                        </Link>
                    </div>
                    <div>
                        <Link to="/profile" className='link' onClick={() => props.setTrigger(false)}>
                            <i className="fa-solid fa-gear"></i>
                            <p>Account Settings</p>
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className='link' onClick={handleLogOut}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <p>Log Out</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    ) : null
}

export default React.memo(UserMenu)