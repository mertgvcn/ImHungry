import React from 'react'
import { RestaurantContextProvider } from '../../context/RestaurantContext'
import { ChangeContextProvider } from '../../context/ChangeContext'
//css
import './HomePage.css'
//COMPONENTS
import Restaurants from './components/Restaurants'
import SearchRestaurant from './components/SearchRestaurant'


const HomePage = () => {

  return (
    <RestaurantContextProvider>
      <ChangeContextProvider>
        <div className="search-location">
          <SearchRestaurant />
          <SearchRestaurant />
        </div>
        <Restaurants />
      </ChangeContextProvider>
    </RestaurantContextProvider>

  )
}

export default HomePage