import { MenuType, RestaurantDetail } from "../RestaurantDataType"

export type RestaurantDetailsPageDataType = {
    restaurant: RestaurantDetailsDataType
}

export type RestaurantDetailsDataType = {
    restaurantDetails: RestaurantDetail,
    menu: MenuType[]
}