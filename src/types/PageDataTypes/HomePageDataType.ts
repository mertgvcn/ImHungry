import { LocationViewModel } from "../../models/ViewModels/LocationViewModel";
import { RestaurantListViewModel } from "../../models/ViewModels/RestaurantListViewModel";

export type HomePageDataType = {
    currentLocation: LocationViewModel | null,
    restaurant: RestaurantListViewModel[] | null,
}