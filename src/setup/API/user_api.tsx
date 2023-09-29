import axios, { Axios, AxiosResponse } from 'axios';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY

export const VerifyUsername = async (username: string) => {
    const response = await axios.put('https://localhost:7181/api/User/VerifyUsername', 
    {
        username
    },
    {
        headers: {
            'x-api-key': API_KEY
        }
    });

    return response.data;
}

//!IForgotMyPassword API's
export const searchEmail = async (email: string) => {
    const response = await axios('https://localhost:7181/api/User/searchEmail', {
        params: {
            email: email
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

//!Profile API'S
export const updateAccountInfo = async (userID: number, firstName: string, lastName: string, userName: string, email: string, phoneNumber: string) => {
    const response = await axios.put('https://localhost:7181/api/User/updateAccountInfo',
        {
            userID: userID,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            password: "",
            locationID: null
        },
        {
            headers: {
                'x-api-key': API_KEY
            }
        })

    return response.data
}

export const searchUserName = async (userName: string) => {
    const response = await axios.get('https://localhost:7181/api/User/searchUserName', {
        params: {
            userName: userName
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

export const changePass = async (userID: number, newPassword: string) => {
    const response = await axios.put('https://localhost:7181/api/User/changePassword',
        {
            userID: userID,
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            phoneNumber: "",
            password: newPassword
        },
        {
            headers: {
                'x-api-key': API_KEY
            }
        })

    return response.data
}

export const verifyPass = async (userID: number, password: string) => {
    const response = await axios.get('https://localhost:7181/api/User/verifyPassByID',
    {
        params: {
            userID: userID,
            password: password
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

return response.data
}

//!LOCATION
export const getCurrentLocation = async (userID: number): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/User/getCurrentLocation', {
        params: {
            userID: userID
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

export const setCurrentLocation = async (userID: number, locationID: number) => {
    const response = await axios.put('https://localhost:7181/api/User/setCurrentLocation',
        {
            userID: userID,
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            phoneNumber: "",
            password: "",
            locationID: locationID
        },
        {
            headers: {
                'x-api-key': API_KEY
            }
        })

    return response.data
}