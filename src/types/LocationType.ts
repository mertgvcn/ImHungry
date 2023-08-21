export type LocationType = {
    locationTitle: string,
    province: string,
    district: string,
    neighbourhood: string,
    street: string,
    buildingNo: string,
    buildingAddition: string,
    apartmentNo: string,
    note: string,
    locationID: number
}

export type LocationCardType = {
    data: {
        locationTitle: string,
        province: string,
        district: string,
        neighbourhood: string,
        street: string,
        buildingNo: string,
        buildingAddition: string,
        apartmentNo: string,
        note: string,
        locationID: number
    }
}