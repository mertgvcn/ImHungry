import axios from 'axios';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY


export const adminLogin = async (adminName: string, encrptedPassword: string) => {
    const response = await axios.get('https://localhost:7181/api/Admin/login', {
        params: {
            adminName: adminName,
            encryptedPass: encrptedPassword
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

export const addRestaurant = (name: string, phoneNumber:string, email:string, description:string, imageSource:string) => {
    const response = axios.post('https://localhost:7181/api/Admin/addRestaurant', 
    { 
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        description: description,
        imageSource: imageSource
    },
    {
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response
}

export const addItemToRestaurant = (restaurantID: string, itemID:string) => {
    const restaurant_id = Number(restaurantID)
    const item_id = Number(itemID)

    const response = axios.post('https://localhost:7181/api/Admin/addItemToRestaurant', 
    {
        restaurantID: restaurant_id,
        itemID: item_id 
    },
    {
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response
}

export const addItem = async (itemName: string, itemDescription:string, imageSource:string, categoryID:string, price:string) => {
    const _categoryID = Number(categoryID)
    const _price = Number(price)

    const response = await axios.post('https://localhost:7181/api/Admin/addItem', {
        itemName: itemName,
        itemDescription: itemDescription,
        imageSource: imageSource,
        categoryID: _categoryID,
        price: _price
    }, 
    {
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response
}

export const getCategories = async () => {
    const response = await axios.get('https://localhost:7181/api/Admin/getCategories', {
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}