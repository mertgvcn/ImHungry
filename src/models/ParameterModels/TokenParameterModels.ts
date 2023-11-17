interface GenerateTokenRequest {
    userId: string;
  }
  
  interface GenerateTokenResponse {
    token: string;
    tokenExpireDate: Date;
  }