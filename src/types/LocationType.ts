export type LocationType = {
    province: string,
    district: string,
    neighbourhood: string,
    address: string,
    locationID: number
}

export type LocationCardType = {
    data: {
        province: string,
        district: string,
        neighbourhood: string,
        address: string,
        locationID: number
    }
}