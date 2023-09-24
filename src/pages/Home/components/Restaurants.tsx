import { useContext, useState } from 'react'
//context
import { RestaurantContext } from '../../../context/RestaurantContext'
import { UserContext } from '../../../context/UserContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { getCurrentLocation } from '../../../setup/API/user_api'
import { getRestaurants } from '../../../setup/API/restaurant_api'
import { Decrypt } from '../../../setup/Cryption'
import useDidMountUpdate from '../../../hooks/useDidMountUpdate'
//type
import { RestaurantDataType, RestaurantListType } from '../../../types/RestaurantDataType'
//css
import '../styles/Restaurants.css'
//components
import RestaurantCard from './RestaurantCard'


type RestaurantsType = {
  restaurant: RestaurantDataType | null,
  hasLocation: boolean
}


const Restaurants = (props: RestaurantsType) => {
  //context
  const { filteredName } = useContext(RestaurantContext)
  const { restaurantToggle } = useContext(ChangeContext)
  const { currentUserID } = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  //if prop.restaurant is null, restaurantList = []. Otherwise it gets the list from prop.restaurant.restaurantList
  const [restaurantList, setRestaurantList] = useState<RestaurantListType[]>(props.restaurant ? props.restaurant.restaurantList : [])

  //if change occurs on location, restaurants gonna be fetched and set locally. 
  const fetchRestaurants = async () => {
    const data: any = await getCurrentLocation(_currentUserID)

    if (!data) {
      props.hasLocation = false
      return;
    }
    else {
      const response = await getRestaurants(data.province, data.district);
      setRestaurantList(response)
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
          {restaurantList?.filter((restaurant: any) => {
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