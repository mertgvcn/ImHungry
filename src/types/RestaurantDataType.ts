export type RestaurantDataType = {
    restaurantList: RestaurantListType[]
}

export type RestaurantListType = {
    restaurantID: number,
    name: string,
    phoneNumber: string,
    email: string,
    description: string,
    imageSource: string,
    province: string,
    district: string,
    neighbourhood: string,
    locationID: number,
    street:string,
    buildingNo: string
}

export type RestaurantCardType = {
    data: {
        restaurantID: number,
        name: string,
        phoneNumber: string,
        email: string,
        description: string,
        imageSource: string
    }
}

//Details & Menu Types
export type RestaurantDetail = {
    restaurantID: number,
    name: string,
    phoneNumber: string,
    email: string,
    description: string,
    imageSource: string
}

export type CategoryType = {
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

export type IngredientType = {
    name: string,
    isActive: boolean
}