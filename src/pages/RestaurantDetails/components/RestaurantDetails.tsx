//models
import { RestaurantSummaryViewModel } from '../../../models/ViewModels/RestaurantSummaryViewModel'
//css
import '../styles/RestaurantDetails.css'


type RestaurantDetailsType = {
    restaurantDetails: RestaurantSummaryViewModel
}


const RestaurantDetails = (props: RestaurantDetailsType) => {
    const {Name, PhoneNumber, Email, Description, ImageSource} = props.restaurantDetails

    return (
        <div className='restaurant-details-wrapper'>
            {ImageSource && (
                <div className="restaurant-image">
                    <img src={require(`../../../assets/RestaurantImages/${ImageSource}`)} alt="img not found" />
                </div>
            )}

            <div className="restaurant-info">
                <div className="restaurant-title">
                    <span id="restaurant-name">{Name}</span>
                    <span id="restaurant-description">{Description}</span>
                </div>
                <div className="restaurant-rating-contact">
                    <div className="restaurant-rating">
                        <p id="restaurant-rate"><i className="fa-solid fa-star" style={{ color: "#B78670" }}></i>4/5</p>
                        <p id="restaurant-rate-number"><i className="fa-solid fa-users" style={{ marginRight: 5, color: "#B78670" }}></i>478</p>
                        <p id="restaurant-comment-number"><i className="fa-solid fa-comment" style={{ marginRight: 3, color: "#B78670" }}></i>102</p>
                    </div>

                    <div className="restaurant-contact">
                        <p id="restaurant-contact-title">CONTACT</p>
                        <hr />
                        <p id="restaurant-email"><i className="fa-solid fa-envelope" style={{ marginRight: 5 }}></i>{Email}</p>
                        <p id="restaurant-phone-number"><i className="fa-solid fa-phone" style={{ marginRight: 5 }}></i>{PhoneNumber}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantDetails