import axios, { AxiosResponse } from "axios";
import { getCookie } from "../../Cookie";
import { AddCategoryRequest } from "../../../models/ParameterModels/MenuParameterModels";

const API_KEY = 'bearer ' + getCookie("jwt")

export const GetMenu = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Menu/GetMenu', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const GetCategories = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Menu/GetCategories', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const AddCategory = async (params: AddCategoryRequest): Promise<AxiosResponse> => {
    const response = await axios.post('https://localhost:7181/api/Menu/AddCategory', {
        name: params.name
    }, 
    {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const DeleteCategoryById = async (categoryId: number): Promise<AxiosResponse> => {
    const response = await axios.delete('https://localhost:7181/api/Menu/DeleteCategoryById', {
        params: {
            categoryId: categoryId,
        },
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}