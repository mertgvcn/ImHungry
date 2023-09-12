export type CreditCardDataType = {
    userCreditCards: UserCreditCardsType[]
}

export type UserCreditCardsType = {
    ccID: number,
    ccNo: string,
    ccName: string,
    cvv: number,
    userID: number,
    expirationDate: string
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