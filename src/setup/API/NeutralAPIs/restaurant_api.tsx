import axios from 'axios';
import { getCookie } from '../../Cookie';
//models
import { GetRestaurantListByLocationRequest } from '../../../models/ParameterModels/RestaurantParameterModels';


const API_KEY = 'bearer ' + getCookie("jwt")


export const GetRestaurantListByLocation = async (params: GetRestaurantListByLocationRequest) => {
    const response = await axios.post('https://localhost:7181/api/Restaurant/GetRestaurantListByLocation',
    {
        province: params.Province,
        district: params.District
    },
    {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}