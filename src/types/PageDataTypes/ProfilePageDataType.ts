import { CreditCardDataType } from "../CreditCardDataType"
import { LocationDataType } from "../LocationDataType"
import { AccountInfoType } from "../UserDataType"

export type ProfilePageDataType = {
    accountInfo : AccountInfoType,
    location : LocationDataType,
    creditCard : CreditCardDataType,
}