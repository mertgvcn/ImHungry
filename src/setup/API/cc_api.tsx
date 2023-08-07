import axios from 'axios';
import React from 'react'

const API_KEY = process.env.REACT_APP_APIKEY

export const getCC = async (userID: number) => {
    const response = await axios.get('https://localhost:7181/api/CreditCard/getCC', {
        params: {
            userID: userID
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}

export const addCC = async (userID: number, ccNo: string, ccName: string, month: number, year: number, cvv: number) => {
    const response = await axios.post('https://localhost:7181/api/CreditCard/addCC', {
        ccNo: ccNo,
        ccName: ccName,
        month: month,
        year: year,
        cvv: cvv,
        userID: userID
    },
        {
            headers: {
                'x-api-key': API_KEY
            }
        })

    return response.data
}

export const deleteCC = async (ccID: number) => {
    const response = await axios.delete('https://localhost:7181/api/CreditCard/deleteCC', {
        params: {
            ccID: ccID,
        },
        headers: {
            'x-api-key': API_KEY
        }
    })

    return response.data
}