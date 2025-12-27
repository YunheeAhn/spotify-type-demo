// auth 관련 타입

// Client Credential Flow 응답 타입
export interface ClientCredentialResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // int
}

// params 타입
export interface AuthURLParams {
  response_type: "code";
  client_id: string;
  scope: string;
  redirect_uri: string;
  code_challenge_method: "S256";
  code_challenge: string;
}
