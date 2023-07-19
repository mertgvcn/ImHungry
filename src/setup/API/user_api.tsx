import axios from 'axios';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY

//!LOGIN API'S
export const login = async (userName: string, encrptedPassword: string) => {
    const response = await axios.get('https://localhost:7181/api/User/login', {
        params: {
            userName: userName,
            encryptedPass: encrptedPassword
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

//!REGISTERATION API'S
export const register = async (firstName: string, lastName: string, userName: string, email: string, phoneNumber: string, encrptedPassword: string) => {
    const response = await axios.post('https://localhost:7181/api/User/register', 
    {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        phoneNumber: phoneNumber,
        password: encrptedPassword
    },
    {
        headers: {
            'x-api-key': API_KEY
        }
    }
    );

return response.data;
}

export const isUserNameAlreadyExists = async (userName: string) => {
    const response = await axios.get('https://localhost:7181/api/User/searchUserName', {
        params: {
            userName: userName,
        },
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