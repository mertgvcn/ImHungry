import { CartDataType } from "./CartDataType"
import { CreditCardDataType } from "./CreditCardDataType"
import { LocationDataType } from "./LocationDataType"
import { RestaurantDataType } from "./RestaurantDataType"
import { UserDataType } from "./UserDataType"

export type DataType = {
    cart: CartDataType,
    location: LocationDataType,
    user: UserDataType,
    creditCard: CreditCardDataType,
    restaurant: RestaurantDataType
}