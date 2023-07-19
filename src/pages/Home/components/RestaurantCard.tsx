import React from 'react'
//CSS
import '../styles/RestaurantCard.css'
//Type
import { RestaurantInfo} from '../../../types/RestaurantType'

const RestaurantCard = ({data: {restaurantID, name, description, imageSource}}:RestaurantInfo) => {

    const showDetails = () => {
        window.location.href = `/restaurant/${restaurantID}`
    }

    return (
        <div className="restaurant-card-wrapper" onClick={showDetails}>
            <div className="restaurant-image">
                <img src={require(`../../../assets/RestaurantImages/${imageSource}`)} alt="resim yok" />
            </div>
            <div className="restaurant-info">
                <div className="restaurant-title">
                    <span id="restaurant-name">{name}</span>
                    <span id="restaurant-description">{description}</span>
                </div>
                <div className="restaurant-rating">
                    <span id="restaurant-rate">4/5</span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard