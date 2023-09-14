import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
//EXPORTED FUNCTIONS
import { getRestaurantDetail } from '../../../setup/API/restaurant_api'
//Type
import { RestaurantDetail } from '../../../types/RestaurantDataType'
//CSS
import '../styles/RestaurantDetails.css'


type RestaurantDetailsType = {
    restaurantDetails: RestaurantDetail
}


const RestaurantDetails = (props: RestaurantDetailsType) => {
    const {restaurantID, name, phoneNumber, email, description, imageSource} = props.restaurantDetails

    return (
        <div className='restaurant-details-wrapper'>
            {imageSource && (
                <div className="restaurant-image">
                    <img src={require(`../../../assets/RestaurantImages/${imageSource}`)} alt="img not found" />
                </div>
            )}

            <div className="restaurant-info">
                <div className="restaurant-title">
                    <span id="restaurant-name">{name}</span>
                    <span id="restaurant-description">{description}</span>
                </div>
                <div className="restaurant-rating-contact">
                    <div className="restaurant-rating">
                        <p id="restaurant-rate"><i className="fa-solid fa-star" style={{ color: "#B78670" }}></i>4/5</p>
                        <p id="restaurant-rate-number"><i className="fa-solid fa-users" style={{ marginRight: 5, color: "#B78670" }}></i>478</p>
                        <p id="restaurant-comment-number"><i className="fa-solid fa-comment" style={{ marginRight: 3, color: "#B78670" }}></i>102</p>
                    </div>

                    <div className="restaurant-contact">
                        <p id="restaurant-contact-title">CONTACT</p>
                        <hr />
                        <p id="restaurant-email"><i className="fa-solid fa-envelope" style={{ marginRight: 5 }}></i>{email}</p>
                        <p id="restaurant-phone-number"><i className="fa-solid fa-phone" style={{ marginRight: 5 }}></i>{phoneNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetails