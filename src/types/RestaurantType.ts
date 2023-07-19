export type RestaurantInfo = {
    data: {
        restaurantID: string,
        name: string,
        phoneNumber: string,
        email: string,
        description: string,
        imageSource: string
    }
}

export type RestaurantDetail = {
    restaurantID: string,
    name: string,
    phoneNumber: string,
    email: string,
    description: string,
    imageSource: string
}

export type MenuType = {
    restaurantID: string,
    itemName: string,
    itemDescription: string,
    imageSource: string,
    categoryID: string,
    price: string
}