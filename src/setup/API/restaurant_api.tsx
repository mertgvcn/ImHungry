import axios from 'axios';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY


export const getRestaurants = async () => {
    const response = await axios.get('https://localhost:7181/api/Restaurant/GetRestaurants', {
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

export const getRestaurantDetail = async (restaurantID: number) => {
    const response = await axios.get('https://localhost:7181/api/Restaurant/GetDetailsByRestaurantID', {
        params: {
            restaurantID: restaurantID
        },
        headers: {
            'x-api-key': API_KEY
        }
    }) 

    return response.data
}

export const getRestaurantMenu = async (restaurantID: number) => {
    const response = await axios.get('https://localhost:7181/api/Restaurant/GetMenuByRestaurantID', {
        params: {
            restaurantID: restaurantID
        },
        headers: {
            'x-api-key': API_KEY
        }
    }) 

    return response.data
}