import React from 'react'
import "./styles/Navbar.css";

type propsType = {
    currentUser?: string
}

const Navbar = (props:propsType) => {

    const goLogin = () => {
        window.location.href = "/"
    }

    return (
        <nav id="navbar-wrapper">
            <div id="navbar-title" onClick={goLogin} style={{ cursor: 'pointer' }}>
                <p id="title"><i className="fa-solid fa-drumstick-bite" style={{paddingRight:"8px"}}></i>Im Hungry</p>
            </div>
            <div>
                {props.currentUser}
            </div>
        </nav>
    )
}

export default Navbar