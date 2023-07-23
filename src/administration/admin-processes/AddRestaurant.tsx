import React, { useState } from 'react'
import { addRestaurant } from '../../setup/API/admin_api'
import './styles/AddRestaurant.css'

const AddRestaurant = () => {
    const [restaurantName, setRestaurantName] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [imageSource, setImageSource] = useState<string>("")

    const handleAddRestaurant = async () => {
        const response = await addRestaurant(restaurantName, phoneNumber, email, description, imageSource)
        console.log(response.data)
    }

    return (
        <div className="add-restaurant-wrapper">
            <h1>ADD RESTAURANT</h1>
            <input type="text" placeholder='restaurant name'
                value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
            <input type="text" placeholder='phone number'
                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="text" placeholder='email'
                value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='description'
                value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder='image source'
                value={imageSource} onChange={(e) => setImageSource(e.target.value)} />
            <input type="button" value="Add" onClick={handleAddRestaurant} />
        </div>
    )
}

export default AddRestaurant