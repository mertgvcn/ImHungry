import { CartDataType } from "./CartTypes/CartDataType"
import { CreditCardDataType } from "./CreditCardTypes/CreditCardDataType"
import { LocationDataType } from "./LocationTypes/LocationDataType"
import { RestaurantDataType } from "./RestaurantTypes/RestaurantDataType"
import { UserDataType } from "./UserTypes/UserDataType"

export type DataType = {
    cart: CartDataType,
    location: LocationDataType,
    user: UserDataType,
    creditCard: CreditCardDataType,
    restaurant: RestaurantDataType
}