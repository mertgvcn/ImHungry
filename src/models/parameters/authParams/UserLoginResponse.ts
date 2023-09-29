export interface UserLoginResponse {
    authenticateResult: boolean,
    authToken: string,
    accessTokenExpireDate: Date
}