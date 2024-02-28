import axios, { AxiosResponse } from "axios";
import { getCookie } from "../../Cookie";

const API_KEY = 'bearer ' + getCookie("jwt")

export const GetItemIngredients = async (itemID: number): Promise<AxiosResponse> => {
    const response = await axios.post("https://localhost:7181/api/Item/GetItemIngredients",
        {
            itemID: itemID
        },
        {
            headers: {
                'Authorization': API_KEY
            }
        })

    return response.data
}