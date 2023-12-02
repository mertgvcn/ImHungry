import { ItemViewModel } from "../../models/ViewModels/ItemViewModel"
import { RestaurantSummaryViewModel } from "../../models/ViewModels/RestaurantSummaryViewModel"

export type RestaurantDetailsPageDataType = {
    restaurant: {
        restaurantDetails: RestaurantSummaryViewModel,
        menu: ItemViewModel[]
    }
}