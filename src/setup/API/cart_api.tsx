import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { promises } from 'dns';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY


export const getUserCartItems = async (userID: number) => {
    try {
        const response = await axios.get('https://localhost:7181/api/Cart/getUserCartItems', {
            params: {
                userID: userID,
            },
            headers: {
                'x-api-key': API_KEY
            }
        })

        return response.data
    } catch (error) {
      
    }
}


export const getUserCartItemNumber = async (userID: number) : Promise<AxiosResponse>  => {
    const response = await axios.get('https://localhost:7181/api/Cart/getUserCartItemNumber', {
        params: {
            userID: userID,
        },
        headers: {
            'x-api-key': API_KEY
        }
    })
 
    return response.data
}


export const addToCart = async (userID: number, itemID: number, restaurantID: number) : Promise<AxiosResponse> => {
    const response = await axios.post('https://localhost:7181/api/Cart/addToCart', {
        userID: userID,
        itemID: itemID,
        restaurantID: restaurantID
    },
        {   
            headers: {
                'x-api-key': API_KEY
            }
        })

    return response.data
}


export const deleteFromCart = async (userID: number, itemID: number, restaurantID: number) => {
    const response = await axios.delete('https://localhost:7181/api/Cart/deleteFromCart', {
        params: {
            userID: userID,
            itemID: itemID,
            restaurantID: restaurantID
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}