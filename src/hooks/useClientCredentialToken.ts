import { useQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

// 클라이언트 자격 증명 토큰을 가져오는 커스텀 훅
const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: getClientCredentialToken,
  });

  const clientCredentialToken = data?.access_token;
  // string | undefined 반환
  return clientCredentialToken;
};

export default useClientCredentialToken;
