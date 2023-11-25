export interface SetCurrentLocationRequest {
  LocationID: number;
}

export interface VerifyUsernameRequest {
  Username: string;
}

export interface VerifyEmailRequest {
  Email: string;
}

export interface VerifyPasswordRequest {
  PlainPassword: string;
}

export interface IForgotMyPasswordRequest {
  Email: string;
  PlainPassword: string;
}

export interface ChangePasswordRequest {
  EncryptedPassword: string;
}