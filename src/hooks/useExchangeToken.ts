import { useMutation } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { TokenExchangeResponse } from "../models/auth";

// useExchangeToken 훅
const useExchangeToken = () => {
  return useMutation<TokenExchangeResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
    },
  });
};

export default useExchangeToken;
