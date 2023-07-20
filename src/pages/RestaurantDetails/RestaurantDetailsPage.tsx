import React from 'react'
import { useParams } from 'react-router-dom'
//COMPONENT
import Navbar from '../../components/Navbar'
import RestaurantDetails from './components/RestaurantDetails'
import Menu from './components/Menu'
//CSS
import './styles/RestaurantDetailsPage.css'



const RestaurantDetailsPage = () => {
    const params = useParams()
    const currentRestaurantID = Number(params.restaurant)

    return (
        <div className='restaurant-detail-background'>
            <Navbar />
            <div className="restaurant-body-layout">
                <RestaurantDetails restaurantID={currentRestaurantID} />
                <Menu restaurantID={currentRestaurantID} />
            </div>
        </div>
    )
}

export default RestaurantDetailsPage