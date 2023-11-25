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

export const DeleteItemFromCart = async (params: CartTransactionRequest) => {
    const ingredientsValue = params.Ingredients === "" ? "boş" : params.Ingredients;
    
    const response = await axios.delete('https://localhost:7181/api/Cart/DeleteItemFromCart', 
    {
        params: {
            itemID: params.ItemID,
            restaurantID: params.RestaurantID,
            ingredients: ingredientsValue,
            amount: params.Amount
        },
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}