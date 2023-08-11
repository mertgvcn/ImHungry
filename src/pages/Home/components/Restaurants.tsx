import React, { useContext, useEffect, useState } from 'react'
import { RestaurantContext } from '../../../context/RestaurantContext'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { getCurrentLocation } from '../../../setup/API/user_api'
import { Decrypt } from '../../../setup/Crypto/Cryption'
//COMPONENTS
import RestaurantCard from './RestaurantCard'
//CSS
import '../styles/Restaurants.css'
//API
import { getRestaurants } from '../../../setup/API/restaurant_api'
//TYPE
import { RestaurantInfo } from '../../../types/RestaurantType'



const Restaurants = () => {
  //context
  const { filteredName } = useContext(RestaurantContext)
  const { toggle } = useContext(ChangeContext)
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //restaurant properties
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  const fetchRestaurants = async () => {
    const data = await getCurrentLocation(_currentUserID)
    const response = await getRestaurants(filteredName, data[0].province, data[0].district);
    setRestaurants(response);
  }

  useEffect(() => {
    fetchRestaurants();
  }, [])

  useEffect(() => {
    fetchRestaurants();
  }, [toggle])
  

  return (
    <div className='restaurant-list-wrapper'>
        <div className="restaurant-title-wrapper">
            <p id="restaurant-title">Restaurants</p>
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