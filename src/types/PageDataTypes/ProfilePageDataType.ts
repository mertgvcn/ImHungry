import { CreditCardViewModel } from "../../models/ViewModels/CreditCardViewModel"
import { LocationViewModel } from "../../models/ViewModels/LocationViewModel"
import { UserAccountViewModel } from "../../models/ViewModels/UserAccountViewModel"

export type ProfilePageDataType = {
    accountInfo : UserAccountViewModel,
    location : LocationViewModel[],
    creditCard : CreditCardViewModel[],
}