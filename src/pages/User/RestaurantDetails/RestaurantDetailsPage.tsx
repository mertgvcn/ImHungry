//helpers
import { RES_DETAILS_PAGE_URL, useFetchData } from '../../../hooks/useFetchData'
import { useLocation } from 'react-router-dom'
//css
import './RestaurantDetailsPage.css'
//type
import { RestaurantDetailsPageDataType } from '../../../types/PageDataTypes/RestaurantDetailsPageDataType'
//component
import RestaurantDetails from './components/RestaurantDetails'
import Menu from './components/Menu'



const RestaurantDetailsPage = () => {
    const location = useLocation()
    const currentRestaurantID = location.state.data;

    const {data, isSuccess} = useFetchData<RestaurantDetailsPageDataType>(RES_DETAILS_PAGE_URL, {restaurantID: currentRestaurantID})

    return isSuccess ?
    (
        <div className='restaurant-detail-background'>
            <div className="restaurant-body-layout">
                <RestaurantDetails restaurantDetails={data!.restaurant.restaurantDetails}/>
                <Menu menu={data!.restaurant.menu}/>
            </div>
        </div>
    )
    :
    (
        <>Loading...</>
    )
}

export default RestaurantDetailsPage