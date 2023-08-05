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

export const addLocation = async (userID: number, locationTitle:string, province: string, district: string, neighbourhood: string, street: string, buildingNo: string, apartmentNo: string, addition:string) => {
    const response = await axios.post('https://localhost:7181/api/Location/addLocation', 
    {
        userID: userID,
        locationTitle: locationTitle,
        province: province,
        district: district,
        neighbourhood: neighbourhood,
        street: street,
        buildingNo: buildingNo,
        apartmentNo: apartmentNo,
        addition: addition
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