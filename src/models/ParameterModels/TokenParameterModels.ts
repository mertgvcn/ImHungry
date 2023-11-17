export interface GenerateTokenRequest {
  userId: string;
}

export interface GenerateTokenResponse {
  token: string;
  tokenExpireDate: Date;
}