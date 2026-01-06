import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getCategories } from "../apis/categoryApi";
import type { GetCategoryRequest } from "../models/category";

// 카테고리 목록을 가져오는 커스텀 훅
const useGetCategories = (params?: GetCategoryRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No Token available");
      }
      return getCategories(clientCredentialToken, params);
    },
    enabled: !!clientCredentialToken,
  });
};

export default useGetCategories;
