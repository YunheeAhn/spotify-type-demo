import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApis";
import useClientCredentialToken from "./useClientCredentialToken";

// 새로운 발매 앨범을 가져오는 커스텀 훅
const useGetNewReleased = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["newReleased"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No Client Credential Token");
      }
      return getNewReleases(clientCredentialToken);
    },
  });
};

export default useGetNewReleased;
