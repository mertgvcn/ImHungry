export interface UserLoginRequest {
  Username: string;
  EncryptedPassword: string;
}

export interface UserLoginResponse {
  AuthenticateResult: boolean;
  AuthToken: string;
  AccessTokenExpireDate: Date;
  Roles: string[];
}

export interface UserRegisterRequest {
  FirstName: string;
  LastName: string;
  Username: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
}

export interface UserRegisterResponse {
  isSuccess: boolean;
  ErrorMessage: string;
}