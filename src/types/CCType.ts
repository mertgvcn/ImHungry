export type CCType = {
    ccID: number,
    ccNo: string,
    ccName: string,
    expirationDate: string,
    cvv: number
}

export type CCCardType = {
    data: {
        ccID: number,
        ccNo: string,
        ccName: string,
        expirationDate: string,
        cvv: number
    }
}