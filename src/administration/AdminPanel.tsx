import React, { useState } from 'react'
//CSS
import './styles/AdminPanel.css'
//COMPONENTS
import AddRestaurant from './admin-processes/AddRestaurant'
import AddItemToRestaurant from './admin-processes/AddItemToRestaurant'
import AddItem from './admin-processes/AddItem'

const AdminPanel = () => {

    return (
        <div className='admin-panel-background'>
            <AddRestaurant/>
            <AddItemToRestaurant/>
            <AddItem/>
        </div>
    )
}

export default AdminPanel