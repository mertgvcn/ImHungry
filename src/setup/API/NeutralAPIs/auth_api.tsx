import axios from "axios"
//Models
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from "../../../models/ParameterModels/AuthParameterModels"



export const LoginUserAsync = async (params: UserLoginRequest): Promise<UserLoginResponse> => {
    const response = await axios.post('https://localhost:7181/api/Auth/login', {
        username: params.Username,
        encryptedPassword: params.EncryptedPassword
    })

    return response.data
}


export const RegisterUserAsync = async (params: UserRegisterRequest): Promise<UserRegisterResponse> => {
    const response = await axios.post('https://localhost:7181/api/Auth/register', {
        firstName: params.FirstName,
        lastName: params.LastName,
        userName: params.Username,
        email: params.Email,
        phoneNumber: params.PhoneNumber,
        password: params.Password
    })

    return response.data
}