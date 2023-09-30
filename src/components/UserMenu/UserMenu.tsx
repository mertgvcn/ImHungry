import React from 'react'
//CSS
import './styles/UserMenu.css'
import { Link } from 'react-router-dom'
import { deleteCookie } from '../../setup/Cookie'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenu = (props: propsType) => {

    const handlePreviousOrders = () => {}

    const handleLogOut = () => {
        deleteCookie("jwt")
        props.setTrigger(false)
        window.location.href = "/"
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
                    <div onClick={handleLogOut}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <p>Log Out</p>
                    </div>
                </div>
            </div>
        </>

    ) : null
}

export default React.memo(UserMenu)