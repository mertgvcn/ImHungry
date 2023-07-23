import React, { useState } from 'react'
import { addItemToRestaurant } from '../../setup/API/admin_api'
import './styles/AddItemToRestaurant.css'

const AddItemToRestaurant = () => {
    //Add Item to Restaurant
    const [restaurantID, setRestaurantID] = useState<string>("")
    const [itemID, setItemID] = useState<string>("")

    const handleAddItemToRestaurant = async () => {
        if(restaurantID.trim() === '' || itemID.trim() === '') {
            console.log("fill the blanks")
            return;
        }

        const response = await addItemToRestaurant(restaurantID, itemID)
        console.log(response.data)
    }

    return (
        <div className="add-item-to-restaurant-wrapper">
            <h2>ADD ITEM TO RESTAURANT</h2>
            <input type="text" placeholder='restaurant ID'
                value={restaurantID} onChange={(e) => setRestaurantID(e.target.value)} />
            <input type="text" placeholder='item ID'
                value={itemID} onChange={(e) => setItemID(e.target.value)} />
            <input type="button" value="add" onClick={handleAddItemToRestaurant} />
        </div>
    )
}

export default AddItemToRestaurant