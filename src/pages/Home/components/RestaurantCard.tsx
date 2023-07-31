import React from 'react'
import { Link } from 'react-router-dom'
//EXPORTED FUNCTIONS
import { Encode } from '../../../setup/Crypto/Cryption'
//CSS
import '../styles/RestaurantCard.css'
//Type
import { RestaurantInfo } from '../../../types/RestaurantType'


const RestaurantCard = ({ data: { restaurantID, name, description, imageSource } }: RestaurantInfo) => {

    return (
        <Link to="/restaurant" state={{data: restaurantID}} className='restaurant-card-wrapper'> {/*gönderilen dataya restaurant details sayfasındaki bütün componentlardan erişebiliyoruz*/}
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
        </Link>

    )
}

export default RestaurantCard