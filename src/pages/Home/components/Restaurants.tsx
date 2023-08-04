import React, { useContext, useEffect, useState } from 'react'
import { RestaurantContext } from '../../../context/RestaurantContext'
import { ChangeContext } from '../../../context/ChangeContext'
//COMPONENTS
import RestaurantCard from './RestaurantCard'
//CSS
import '../styles/Restaurants.css'
//API
import { getRestaurants } from '../../../setup/API/restaurant_api'
//TYPE
import { RestaurantInfo } from '../../../types/RestaurantType'



const Restaurants = () => {
  const { filteredName } = useContext(RestaurantContext)
  const { toggle } = useContext(ChangeContext)
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  const getRestaurantInfos = async () => {
    const response = await getRestaurants(filteredName);
    setRestaurants(response);
  }

  useEffect(() => {
    getRestaurantInfos();
  }, [toggle])
  

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