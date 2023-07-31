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

export type MenuTitlesType = {
    categoryID: string,
    categoryName: string
}

export type MenuType = {
    restaurantID: string,
    itemID: number,
    itemName: string,
    itemDescription: string,
    imageSource: string,
    categoryID: string,
    price: string,
    categoryName: string
}

export type MenuItemType = {
    data: {
        restaurantID: string,
        itemID: number,
        itemName: string,
        itemDescription: string,
        imageSource: string,
        categoryID: string,
        price: string,
        categoryName: string
    }
}