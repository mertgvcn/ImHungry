export type UserDataType = {
    accountInfo: AccountInfoType | null,
    currentLocation: CurrentLocationType | null,
}

export type AccountInfoType = {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    phoneNumber: string
}

export type CurrentLocationType = {
    locationTitle: string,
    province: string,
    district: string,
    neighbourhood:string,
    street: string ,
    buildingNo: string,
    buildingAddition:  string,
    apartmentNo:string ,
    note: string
}