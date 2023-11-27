import axios, { AxiosResponse } from 'axios';
import { getCookie } from '../Cookie';
//models
import { AddLocationRequest } from '../../models/ParameterModels/LocationParameterModels';


const API_KEY = 'bearer ' + getCookie("jwt")

export const GetUserLocationList = async (): Promise<AxiosResponse> => {
    const response = await axios.get('https://localhost:7181/api/Location/GetUserLocationList', {
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}

export const AddLocation = async (params: AddLocationRequest): Promise<AxiosResponse> => {
    const response = await axios.post('https://localhost:7181/api/Location/AddLocation', 
    {
        locationTitle: params.LocationTitle,
        province: params.Province,
        district: params.District,
        neighbourhood: params.Neighbourhood,
        street: params.Street,
        buildingNo: params.BuildingNo,
        buildingAddition: params.BuildingAddition,
        apartmentNo: params.ApartmentNo,
        note: params.Note
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
    const response = await axios.delete('https://localhost:7181/api/Location/DeleteLocationByLocationID', {
        params: {
            locationID: locationID,
        },
        headers: {
            'Authorization': API_KEY
        }
    })

    return response.data
}