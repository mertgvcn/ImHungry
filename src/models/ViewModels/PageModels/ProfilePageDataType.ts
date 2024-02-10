import { CreditCardViewModel } from "../CreditCardViewModel"
import { LocationViewModel } from "../LocationViewModel"
import { UserAccountViewModel } from "../UserAccountViewModel"

export type ProfilePageDataType = {
    accountInfo : UserAccountViewModel,
    location : LocationViewModel[],
    creditCard : CreditCardViewModel[],
}