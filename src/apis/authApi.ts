import axios from "axios";
import { client_Id, client_Secret, REDIRECT_URI } from "../configs/authConfig";
import type { ClientCredentialResponse, TokenExchangeResponse } from "../models/auth";

// Base64 인코딩 함수
const encodedCredentials = btoa(`${client_Id}:${client_Secret}`);

// 클라이언트 자격 증명 토큰을 가져오는 함수
export const getClientCredentialToken = async (): Promise<ClientCredentialResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Failed to fetch client credential token", error);
    throw new Error("Failed to fetch client credential token");
  }
};

// 토큰 교환 함수
export const exchangeToken = async (
  code: string,
  codeVerifier: string
): Promise<TokenExchangeResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    if (!client_Id || !REDIRECT_URI) {
      throw new Error("Missing client ID or redirect URI");
    }
    const body = new URLSearchParams({
      client_id: client_Id,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Failed to exchange token", error);
    throw new Error("Failed to exchange token");
  }
};
