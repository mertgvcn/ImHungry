import { Category } from "../../EntityModels/Category"
import { ItemViewModel } from "../ItemViewModel"
import { RestaurantSummaryViewModel } from "../RestaurantSummaryViewModel"

export type RestaurantDetailsPageDataType = {
    restaurant: {
        restaurantDetails: RestaurantSummaryViewModel,
        menu: ItemViewModel[],
        categories: Category[]
    }
}