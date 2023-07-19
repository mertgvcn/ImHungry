import React, { useEffect, useState } from 'react'
//COMPONENTS
import RestaurantCard from './RestaurantCard'
//CSS
import '../styles/Restaurants.css'
//API
import { getRestaurants } from '../../../setup/API/restaurant_api'
//TYPE
import { RestaurantInfo } from '../../../types/RestaurantType'



const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  const getRestaurantInfos = async () => {
    const response = await getRestaurants();
    setRestaurants(response);
  }

  useEffect(() => {
    getRestaurantInfos();
  }, [])
  

  return (
    <div className='restaurant-list-wrapper'>
        <div className="restaurant-title-wrapper">
            <p id="restaurant-title">RESTAURANTS</p>
        </div>

        <div className="restaurant-wrapper">
            {restaurants.map((restaurant:any, key)=> (
              <RestaurantCard data={restaurant} key={key} />
            ))}
        </div>
    </div>
  )
}

export default Restaurants