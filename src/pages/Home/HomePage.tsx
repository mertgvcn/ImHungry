import React from 'react'
import { RestaurantContextProvider } from '../../context/RestaurantContext'
//css
import './HomePage.css'
//COMPONENTS
import Restaurants from './components/Restaurants'
import SearchRestaurant from './components/SearchRestaurant'


const HomePage = () => {

  return (
    <RestaurantContextProvider>
      <div className="search-location">
        <SearchRestaurant />
        <SearchRestaurant />
      </div>
      <Restaurants />
    </RestaurantContextProvider>

  )
}

export default HomePage