interface UserLoginRequest {
    username: string;
    encryptedPassword: string;
  }
  
  interface UserLoginResponse {
    authenticateResult: boolean;
    authToken: string;
    accessTokenExpireDate: Date;
  }
  
  interface UserRegisterRequest {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
  
  interface UserRegisterResponse {
    isSuccess: boolean;
    errorMessage: string;
  }