export interface GenerateTokenRequest {
  UserId: string;
}

export interface GenerateTokenResponse {
  Token: string;
  TokenExpireDate: Date;
}