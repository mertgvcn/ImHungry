import axios, { AxiosResponse } from 'axios';
import { getCookie } from '../Cookie';
//models
import { SetAccountInfoRequest } from '../../models/parameters/userParams/SetAccountInfoRequest';


const API_KEY = 'bearer ' + getCookie("jwt")


export const GetCurrentLocation = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/User/GetCurrentLocation', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const SetCurrentLocation = async (locationID: number) => {
    const response = await axios.put('https://localhost:7181/api/User/SetCurrentLocation',
        {
            locationID: locationID
        },
        {
            headers: {
                'Authorization': API_KEY,
            }
        })

    return response.data
}

export const SetAccountInfo = async (params: SetAccountInfoRequest) => {
    const response = await axios.put('https://localhost:7181/api/User/SetAccountInfo',
        {
            firstName: params.firstName,
            lastName: params.lastName,
            userName: params.userName,
            email: params.email,
            phoneNumber: params.phoneNumber,
        },
        {
            headers: {
                'Authorization': API_KEY
            }
        })

    return response.data
}

export const VerifyUsername = async (username: string) => {
    const response = await axios.post('https://localhost:7181/api/User/VerifyUsername',
        {
            username: username
        },
        {
            headers: {
                'Authorization': API_KEY
            }
        });

    return response.data;
}

export const VerifyEmail = async (email: string) => {
    const response = await axios.post('https://localhost:7181/api/User/VerifyEmail',
        {
            email: email
        },
        {
            headers: {
                'Authorization': API_KEY
            }
        })

    return response.data
}

export const VerifyPassword = async (password: string) => {
    const response = await axios.post('https://localhost:7181/api/User/VerifyPassword',
        {
            password: password
        },
        {
            headers: {
                'Authorization': API_KEY,
            }
        })

    return response.data
}

export const ChangePassword = async (encryptedPassword: string) => {
    const response = await axios.put('https://localhost:7181/api/User/ChangePassword',
        {
            encryptedPassword: encryptedPassword
        },
        {
            headers: {
                'Authorization': API_KEY,
            }
        })

    return response.data
}


