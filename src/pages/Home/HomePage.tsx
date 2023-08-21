import React from 'react'
import { RestaurantContextProvider } from '../../context/RestaurantContext'
//css
import './HomePage.css'
//COMPONENTS
import Restaurants from './components/Restaurants'
import SearchRestaurant from './components/SearchRestaurant'
import CurrentLocation from '../../components/Shared/CurrentLocation'


const HomePage = () => {

  return (
    <RestaurantContextProvider>
        <div className="search-location">
          <SearchRestaurant />
          <CurrentLocation width='45' />
        </div>
        <Restaurants />
    </RestaurantContextProvider>

  )
}

export default HomePage