import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { RestaurantDataType, RestaurantListType } from '../../../types/RestaurantTypes/RestaurantDataType'
import { CurrentLocationType } from '../../../types/UserTypes/UserDataType'
import useDidMountUpdate from '../../../hooks/useDidMountUpdate'


type RestaurantsType = {
  restaurant: RestaurantDataType,
  hasLocation: boolean
}



const Restaurants = (props: RestaurantsType) => {
  //context
  const { filteredName } = useContext(RestaurantContext)
  const { restaurantToggle } = useContext(ChangeContext)
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  const [restaurants, setRestaurants] = useState<RestaurantListType[]>(props.restaurant?.restaurantList)

  //if change occurs on location, restaurants gonna be fetched and set locally. 
  const fetchRestaurants = async () => {
    const data: any = await getCurrentLocation(_currentUserID)

    if (data.length == 0) {
      props.hasLocation = false
      return;
    }
    else {
      const response = await getRestaurants(data[0].province, data[0].district);
      setRestaurants(response)
    }
  }

  useDidMountUpdate(() => {
    fetchRestaurants();
  }, [restaurantToggle])

  return (
    <div className='restaurant-list-wrapper'>
      <div className="restaurant-title-wrapper">
        <p id="restaurant-title">Restaurants</p>
      </div>

      {props.hasLocation ?
        <div className="restaurant-wrapper">
          {restaurants?.filter((restaurant: any) => {
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