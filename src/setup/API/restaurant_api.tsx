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

//Gives us distinct category id and category name according to categories the restaurant has
export const getMenuTitles = async (restaurantID: number) => { 
    const response = await axios.get('https://localhost:7181/api/Restaurant/GetMenuTitlesByRestaurantID', {
        params: {
            restaurantID: restaurantID
        },
        headers: {
            'x-api-key': API_KEY
        }
    }) 

    return response.data
}

//Gives us all menu items (to extract by categories, combine it with getMenuTitles)
export const getMenu = async (restaurantID: number) => {
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