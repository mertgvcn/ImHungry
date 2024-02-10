import { LocationViewModel } from "../LocationViewModel";
import { RestaurantListViewModel } from "../RestaurantListViewModel";

export type HomePageDataType = {
    currentLocation: LocationViewModel | null,
    restaurant: RestaurantListViewModel[] | null,
}