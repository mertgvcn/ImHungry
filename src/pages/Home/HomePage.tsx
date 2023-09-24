import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { RestaurantContextProvider } from '../../context/RestaurantContext'
//helpers
import { HOME_PAGE_URL, useFetchData } from '../../hooks/useFetchData'
import { Decrypt } from '../../setup/Cryption'
//css
import './HomePage.css'
//types
import { HomePageDataType } from '../../types/PageDataTypes/HomePageDataType'
//components
import Restaurants from './components/Restaurants'
import SearchRestaurant from './components/SearchRestaurant'
import CurrentLocation from '../../components/Shared/CurrentLocation'



const HomePage = () => {
  const {currentUserID} = useContext(UserContext)
  const _currentUserID = Decrypt(currentUserID)

  const {data,isSuccess} = useFetchData<HomePageDataType>(HOME_PAGE_URL, {userID: _currentUserID})
  const hasLocation = (data?.currentLocation != null)

  return isSuccess ? 
  (
    <RestaurantContextProvider>
      <div className="search-location">
        <SearchRestaurant />
        <CurrentLocation width='45' currentLocation={data!.currentLocation}/>
      </div>
      <Restaurants restaurant={data!.restaurant} hasLocation={hasLocation} />
    </RestaurantContextProvider>
  )
  : 
  (
    <>Loading...</>
  )

}

export default HomePage