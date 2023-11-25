import { useContext, useState } from 'react'
//context
import { RestaurantContext } from '../../../context/RestaurantContext'
import { ChangeContext } from '../../../context/ChangeContext'
//exported functions
import { GetCurrentLocation } from '../../../setup/API/user_api'
import { GetRestaurantListByLocation } from '../../../setup/API/restaurant_api'
import useDidMountUpdate from '../../../hooks/useDidMountUpdate'
//models
import { RestaurantListViewModel } from '../../../models/ViewModels/RestaurantListViewModel'
import { GetRestaurantListByLocationRequest } from '../../../models/ParameterModels/RestaurantParameterModels'
//css
import '../styles/Restaurants.css'
//components
import RestaurantCard from './RestaurantCard'


type RestaurantsType = {
  restaurants: RestaurantListViewModel[] | null,
  hasLocation: boolean
}


const Restaurants = (props: RestaurantsType) => {
  //context
  const { filteredName } = useContext(RestaurantContext)
  const { restaurantToggle } = useContext(ChangeContext)

  //if prop.restaurant is null, restaurantList = []. Otherwise it gets the list from prop.restaurant.restaurantList
  const [restaurantList, setRestaurantList] = useState<RestaurantListViewModel[]>(props.restaurants ? props.restaurants : [])
  const [hasLocation, setHasLocation] = useState<boolean>(props.hasLocation)

  //if change occurs on location, restaurants gonna be fetched and set locally. 
  const fetchRestaurants = async () => {
    const data: any = await GetCurrentLocation()

    if (!data) {
      setHasLocation(false)
      return;
    }
    else {
      const getRestaurantListByLocationParams: GetRestaurantListByLocationRequest = {
        Province: data.province,
        District: data.district
      }

      const response = await GetRestaurantListByLocation(getRestaurantListByLocationParams);
      setRestaurantList(response)
      setHasLocation(true)
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

      {hasLocation ?
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
          <p>Please select an adress to see restaurants</p>
        </div>
      }

    </div>
  )
}

export default Restaurants