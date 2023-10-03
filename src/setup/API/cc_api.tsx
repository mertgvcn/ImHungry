import axios, { AxiosResponse } from 'axios';
import { getCookie } from '../Cookie';
//models
import { AddCreditCardRequest } from '../../models/parameters/creditCardParams/AddCreditCardRequest';

const API_KEY = 'bearer ' + getCookie("jwt")

export const GetUserCreditCards = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/CreditCard/GetUserCreditCards', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data.userCreditCards
}

export const AddCreditCard = async (params: AddCreditCardRequest): Promise<AxiosResponse> => {
    const response = await axios.post('https://localhost:7181/api/CreditCard/AddCreditCard',
        {
            creditCardNumber: params.creditCardNumber,
            creditCardHolderName: params.creditCardHolderName,
            expirationDate: params.expirationDate,
            cvv: params.cvv,
        },
        {
            headers: {
                'Authorization': API_KEY
            }
        })

    return response.data
}

export const DeleteCreditCardByID = async (creditCardID: number): Promise<AxiosResponse> => {
    const response = await axios.delete('https://localhost:7181/api/CreditCard/DeleteCreditCardByID', {
        params: {
            creditCardID: creditCardID,
        },
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}