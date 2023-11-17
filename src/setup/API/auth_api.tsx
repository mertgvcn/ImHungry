import axios from "axios"
//Models
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from "../../models/ParameterModels/AuthParameterModels"



export const LoginUserAsync = async (params: UserLoginRequest): Promise<UserLoginResponse> => {
    const response = await axios.post('https://localhost:7181/api/Auth/login', {
        username: params.username,
        encryptedPassword: params.encryptedPassword
    })

    return response.data
}


export const RegisterUserAsync = async (params: UserRegisterRequest): Promise<UserRegisterResponse> => {
    const response = await axios.post('https://localhost:7181/api/Auth/register', {
        firstName: params.firstName,
        lastName: params.lastName,
        userName: params.username,
        email: params.email,
        phoneNumber: params.phoneNumber,
        password: params.password
    })

    return response.data
}