export interface UserLoginRequest {
  username: string;
  encryptedPassword: string;
}

export interface UserLoginResponse {
  authenticateResult: boolean;
  authToken: string;
  accessTokenExpireDate: Date;
}

export interface UserRegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface UserRegisterResponse {
  isSuccess: boolean;
  errorMessage: string;
}