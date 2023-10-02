import axios from "axios"
//Params
import { UserLoginRequest } from "../../models/parameters/authParams/UserLoginRequest"
import { UserLoginResponse } from "../../models/parameters/authParams/UserLoginResponse"
import { UserRegisterRequest } from "../../models/parameters/authParams/UserRegisterRequest"
import { UserRegisterResponse } from "../../models/parameters/authParams/UserRegisterResponse"


export const LoginUserAsync = async (params: UserLoginRequest): Promise<UserLoginResponse> => {
    const response = await axios.post('https://localhost:7181/api/Auth/login', {
        username: params.username,
        encryptedPassword: params.password
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