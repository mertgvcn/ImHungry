import { Link } from 'react-router-dom'
//css
import '../styles/RestaurantCard.css'
//models
import { RestaurantSummaryViewModel } from '../../../models/ViewModels/RestaurantSummaryViewModel'


type RestaurantCardType = {
    data : RestaurantSummaryViewModel
}


const RestaurantCard = ( { data : { Id, Name, Description, ImageSource } }: RestaurantCardType) => {

    return (
        <Link to="/restaurant" state={{data: Id}} className='restaurant-card-wrapper'> {/*gönderilen dataya restaurant details sayfasındaki bütün componentlardan erişebiliyoruz*/}
                <div className="restaurant-image">
                    <img src={require(`../../../assets/RestaurantImages/${ImageSource}`)} alt="resim yok" />
                </div>
                <div className="restaurant-info">
                    <div className="restaurant-title">
                        <span id="restaurant-name">{Name}</span>
                        <span id="restaurant-description">{Description}</span>
                    </div>
                    <div className="restaurant-rating">
                        <span id="restaurant-rate">4/5</span>
                    </div>
                </div>
        </Link>

    )
}

export default RestaurantCard