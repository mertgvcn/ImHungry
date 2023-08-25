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
  const { restaurantToggle } = useContext(ChangeContext)
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //restaurant properties
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [userHasLocation, setUserHasLocation] = useState<boolean>(false);

  const fetchRestaurants = async () => {
    const data: any = await getCurrentLocation(_currentUserID)

    if (data.length == 0) {
      setUserHasLocation(false)
      return;
    }
    else {
      const response = await getRestaurants(data[0].province, data[0].district);
      setRestaurants(response);
      setUserHasLocation(true)
    }
  }

  useEffect(() => {
    fetchRestaurants();
  }, [restaurantToggle])

  return (
    <div className='restaurant-list-wrapper'>
      <div className="restaurant-title-wrapper">
        <p id="restaurant-title">Restaurants</p>
      </div>

      {userHasLocation ?
        <div className="restaurant-wrapper">
          {restaurants.filter((restaurant: any) => {
            return filteredName.toLowerCase() === ''
              ? restaurant
              : restaurant.name.toLowerCase().includes(filteredName.toLowerCase())
          }).map((restaurant: any, key) => (
            <RestaurantCard data={restaurant} key={key} />
          ))}
        </div>
        :
        <div className='restaurant-error'>
          <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 10 }}></i>
          <p>Please add a adress to see restaurants</p>
        </div>
      }

    </div>
  )
}

export default Restaurants