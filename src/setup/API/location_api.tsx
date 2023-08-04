import axios from 'axios';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY

export const getLocationsByUserID = async (userID: number) => {
    const response = await axios.get('https://localhost:7181/api/Location/getLocationsByUserID', {
        params: {
            userID: userID
        }, 
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

export const addLocation = async (userID: number, province: string, district: string, neighbourhood: string, address: string) => {
    const response = await axios.post('https://localhost:7181/api/Location/addLocation', 
    {
        userID: userID,
        province: province,
        district: district,
        neighbourhood: neighbourhood,
        address: address,
    },
    {
        headers: {
            'x-api-key': API_KEY
        }
    }
    );

return response.data;
}

export const deleteLocationByID = async (locationID: number) => {
    const response = await axios.delete('https://localhost:7181/api/Location/deleteByID', {
        params: {
            locationID: locationID,
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}