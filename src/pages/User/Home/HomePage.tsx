import { RestaurantContextProvider } from '../../../context/RestaurantContext'
//helpers
import { HOME_PAGE_URL, useFetchData } from '../../../hooks/useFetchData'
//css
import './HomePage.css'
//types
import { HomePageDataType } from '../../../types/PageDataTypes/HomePageDataType'
//components
import Restaurants from './components/Restaurants'
import SearchRestaurant from './components/SearchRestaurant'
import CurrentLocation from '../../../components/Shared/CurrentLocation'



const HomePage = () => {
  const {data,isSuccess} = useFetchData<HomePageDataType>(HOME_PAGE_URL)
  const hasLocation = (data?.currentLocation != null)

  return isSuccess ? 
  (
    <RestaurantContextProvider>
      <div className="search-location">
        <SearchRestaurant />
        <CurrentLocation width='45' currentLocation={data!.currentLocation}/>
      </div>
      <Restaurants restaurants={data!.restaurant} hasLocation={hasLocation} />
    </RestaurantContextProvider>
  )
  : 
  (
    <>Loading...</>
  )

}

export default HomePage