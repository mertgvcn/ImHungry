import axios, { AxiosResponse } from 'axios';
import React from 'react'
import { getCookie } from '../Cookie';
import { AddLocationRequest } from '../../models/parameters/locationParams/AddLocationRequest';

const API_KEY = 'bearer ' + getCookie("jwt")

export const GetUserLocationList = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Location/GetUserLocationList', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data.userLocations
}

export const AddLocation = async (params: AddLocationRequest): Promise<AxiosResponse> => {
    const response = await axios.post('https://localhost:7181/api/Location/addLocation', 
    {
        locationTitle: params.locationTitle,
        province: params.province,
        district: params.district,
        neighbourhood: params.neighbourhood,
        street: params.street,
        buildingNo: params.buildingNo,
        buildingAddition: params.buildingAddition,
        apartmentNo: params.apartmentNo,
        note: params.note
    },
    {
        headers: {
            'Authorization': API_KEY
        }
    }
    );

return response.data;
}

export const DeleteLocationByLocationID = async (locationID: number): Promise<AxiosResponse> => {
    const response = await axios.delete('https://localhost:7181/api/Location/deleteByID', {
        params: {
            locationID: locationID,
        },
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}