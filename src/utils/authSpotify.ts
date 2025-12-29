import { client_Id, REDIRECT_URI, SCOPE } from "../configs/authConfig";
import { base64encode, generateRandomString, sha256 } from "./crypto";
import type { AuthURLParams } from "../models/auth";

// 로그인 관련

// 스포티파이 인증 URL 생성 함수
export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);

  const codeChallenge = base64encode(hashed);

  const clientId = client_Id;
  const redirectUri = REDIRECT_URI;

  const scope = SCOPE;
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  if (!clientId || !redirectUri) return;

  const params: AuthURLParams = {
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  };

  authUrl.search = new URLSearchParams(Object.entries(params)).toString();
  window.location.href = authUrl.toString(); // 스포티파이 로그인 주소
};
