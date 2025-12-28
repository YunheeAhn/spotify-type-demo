import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { TokenExchangeResponse } from "../models/auth";

// useExchangeToken 훅
const useExchangeToken = () => {
  const queryClient = useQueryClient();

  return useMutation<TokenExchangeResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["current-User-Profile"],
      });
    },
  });
};

export default useExchangeToken;
