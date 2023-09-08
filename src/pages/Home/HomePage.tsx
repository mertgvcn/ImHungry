import React, { useState } from 'react'
import { RestaurantContextProvider } from '../../context/RestaurantContext'
//css
import './HomePage.css'
//types
import { DataType } from '../../types/DataType'
//components
import Restaurants from './components/Restaurants'
import SearchRestaurant from './components/SearchRestaurant'
import CurrentLocation from '../../components/Shared/CurrentLocation'


type HomePageDataType = {
  data: DataType
}

const HomePage = (props: HomePageDataType) => {
  const hasLocation = (props.data.user?.currentLocation?.length > 0) //değişecek

  return (
    <RestaurantContextProvider>
      <div className="search-location">
        <SearchRestaurant />
        <CurrentLocation width='45' />
      </div>
      <Restaurants restaurant={props.data.restaurant} hasLocation={hasLocation} />
    </RestaurantContextProvider>
  )

}

export default HomePage