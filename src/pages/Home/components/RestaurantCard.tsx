import { Link } from 'react-router-dom'
//css
import '../styles/RestaurantCard.css'
//type
import { RestaurantCardType } from '../../../types/RestaurantDataType'


const RestaurantCard = ({ data: { restaurantID, name, description, imageSource } }: RestaurantCardType) => {

    return (
        <Link to="/restaurant" state={{data: restaurantID}} className='restaurant-card-wrapper'> {/*gönderilen dataya restaurant details sayfasındaki bütün componentlardan erişebiliyoruz*/}
                <div className="restaurant-image">
                    <img src={require(`../../../assets/RestaurantImages/${imageSource}`)} alt="resim yok" />
                </div>
                <div className="restaurant-info">
                    <div className="restaurant-title">
                        <span id="restaurant-name">{name}</span>
                        <span id="restaurant-description">{description}</span>
                    </div>
                    <div className="restaurant-rating">
                        <span id="restaurant-rate">4/5</span>
                    </div>
                </div>
        </Link>

    )
}

export default RestaurantCard