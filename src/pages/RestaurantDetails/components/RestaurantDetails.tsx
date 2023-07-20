import React, { useEffect, useState } from 'react'
//EXPORTED FUNCTIONS
import { getRestaurantDetail } from '../../../setup/API/restaurant_api'
import { RestaurantDetail } from '../../../types/RestaurantType'
//CSS
import '../styles/RestaurantDetails.css'

type propsType = {
    restaurantID: number
}

const RestaurantDetails = (props: propsType) => {
    const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetail>({ restaurantID: "", name: "", description: "", email: "", imageSource: "", phoneNumber: "" })

    const fetchRestaurantDetails = async () => {
        const data = await getRestaurantDetail(props.restaurantID)
        setRestaurantDetails(data[0])
    }

    useEffect(() => {
        fetchRestaurantDetails()
    }, [])

    return (
        <div className='restaurant-details-wrapper'>
            {restaurantDetails.imageSource && (
                <div className="restaurant-image">
                    <img src={require(`../../../assets/RestaurantImages/${restaurantDetails.imageSource}`)} alt="img not found" />
                </div>
            )}
            <div className="restaurant-title">
                <span id="restaurant-name">{restaurantDetails.name}</span>
                <span id="restaurant-description">{restaurantDetails.description}</span>
            </div>

            <div className="restaurant-rating">
                <span id="restaurant-rate"><i className="fa-solid fa-star" style={{color:"#87314e"}}></i>4/5</span>
                <span id="restaurant-rate-number"><i className="fa-solid fa-users" style={{marginRight:5, color:"#512645"}}></i>478</span>
                <span id="restaurant-comment-number"><i className="fa-solid fa-comment" style={{marginRight:3, color:"#512645"}}></i>102</span>
            </div>

            <div className="restaurant-contact">
                <span id="restaurant-contact-title">CONTACT</span>
                <hr />
                <span id="restaurant-email"><i className="fa-solid fa-envelope" style={{marginRight:5}}></i>{restaurantDetails.email}</span>
                <span id="restaurant-phone-number"><i className="fa-solid fa-phone" style={{marginRight:5}}></i>{restaurantDetails.phoneNumber}</span>
            </div>

        </div>
    )
}

export default RestaurantDetails