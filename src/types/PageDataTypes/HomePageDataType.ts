import { RestaurantDataType } from "../RestaurantDataType"
import { CurrentLocationType } from "../UserDataType"

export type HomePageDataType = {
    currentLocation: CurrentLocationType | null,
    restaurant: RestaurantDataType | null,
}