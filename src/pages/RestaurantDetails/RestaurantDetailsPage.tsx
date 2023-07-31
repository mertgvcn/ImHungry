//COMPONENT
import RestaurantDetails from './components/RestaurantDetails'
import Menu from './components/Menu'
//CSS
import './styles/RestaurantDetailsPage.css'

const RestaurantDetailsPage = () => {

    return (
        <div className='restaurant-detail-background'>
            <div className="restaurant-body-layout">
                <RestaurantDetails />
                <Menu />
            </div>
        </div>
    )
}

export default RestaurantDetailsPage