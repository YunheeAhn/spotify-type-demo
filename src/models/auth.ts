// auth 관련 타입

// Client Credential Flow 응답 타입
export interface ClientCredentialResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // int
}
