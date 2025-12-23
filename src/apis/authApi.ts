import axios from "axios";
import { clientId, clientSecret } from "../configs/authConfig";
import type { ClientCredentialResponse } from "../models/auth";

// Base64 인코딩 함수
const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString("base64");
};

// 클라이언트 자격 증명 토큰을 가져오는 함수
export const getClientCredentialToken = async (): Promise<ClientCredentialResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await axios.post("https://accounts.spotify.com/api/token", body, {
      headers: {
        Authorization: `Basic ${encodeBase64(`${clientId}:${clientSecret}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch client credential token");
  }
};
