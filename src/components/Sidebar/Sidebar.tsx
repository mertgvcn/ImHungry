import React from 'react'
import { useNavigate } from 'react-router-dom'
//helpers
import { SidebarData } from './SidebarData'
import { deleteCookie } from '../../setup/Cookie'
//css
import "./styles/Sidebar.css"

const Sidebar = () => {
    const navigate = useNavigate()
    console.log("rerendering sidebar")

    const handleLogout = () => {
        deleteCookie("jwt")
        window.location.href = "/"
    }

    return (
        <div className='sidebar-wrapper'>
            <ul className='sidebar-list'>
                {SidebarData.map((data, key) => {
                    return (
                        <li 
                            key={key}
                            id={window.location.pathname == data.link ? 'active' : 'inactive'}
                            className='row'
                            onClick={() => {
                                navigate(data.link)
                            }}>                           
                            <i id='icon' className={data.icon}></i>
                            <div id='title'>{data.title}</div>
                        </li>
                    )
                })}

                <li className='row' onClick={handleLogout}>
                    <i id='icon' className='fa-solid fa-right-from-bracket'></i>
                    <div id='title'>Logout</div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar