export type LocationDataType = {
    userLocations: UserLocationsType[]
}

export type UserLocationsType = {
    userID: number,
    province: string,
    district: string,
    neighbourhood: string,
    locationID: number,
    street: string ,
    buildingNo: string,
    apartmentNo: string,
    note: string,
    locationTitle: string,
    buildingAddition: string
}