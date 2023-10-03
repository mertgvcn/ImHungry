import axios from 'axios';
import React from 'react'
import { getCookie } from '../Cookie';
//models
import { GetRestaurantListByLocationRequest } from '../../models/parameters/restaurantParams/GetRestaurantListByLocationRequest';

const API_KEY = 'bearer ' + getCookie("jwt")


export const GetRestaurantListByLocation = async (params: GetRestaurantListByLocationRequest | null) => {
    const response = await axios.post('https://localhost:7181/api/Restaurant/GetRestaurantListByLocation',
    {
        province: params?.province,
        district: params?.district
    },
    {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}