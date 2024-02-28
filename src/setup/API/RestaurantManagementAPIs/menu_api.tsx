import axios, { AxiosResponse } from "axios";
import { getCookie } from "../../Cookie";

const API_KEY = 'bearer ' + getCookie("jwt")

export const GetMenu = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Menu/GetMenu', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}