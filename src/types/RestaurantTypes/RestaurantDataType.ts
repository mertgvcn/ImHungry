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
        restaurantID: string,
        name: string,
        phoneNumber: string,
        email: string,
        description: string,
        imageSource: string
    }
}