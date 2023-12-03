import axios, { AxiosResponse } from 'axios';
import { getCookie } from '../Cookie';
//models
import { CartTransactionRequest } from '../../models/ParameterModels/CartParameterModels';



const API_KEY = 'bearer ' + getCookie("jwt")


export const GetUserCartItemList = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Cart/GetUserCartItemList', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const GetUserCartItemNumber = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Cart/GetUserCartItemNumber', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const AddItemToCart = async (params: CartTransactionRequest): Promise<AxiosResponse> => {
    const response = await axios.post('https://localhost:7181/api/Cart/AddItemToCart',
        {
            cartItemID: params.CartItemID,
            itemID: params.ItemID,
            restaurantID: params.RestaurantID,
            ingredients: params.Ingredients,
            amount: params.Amount
        },
        {
            headers: {
                'Authorization': API_KEY
            }
        })

    return response.data
}

export const DecreaseItemAmountByOne = async (cartItemID: number) => {
    const response = await axios.delete('https://localhost:7181/api/Cart/DecreaseItemAmountByOne', 
    {
        params: {
            cartItemID: cartItemID
        },
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}