import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

// 키워드 검색 결과 가져오는 훅
const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  // token은 어디서 가져오지?
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) throw new Error("No Client Credential Token");

      return SearchItemsByKeyword(clientCredentialToken, { ...params, offset: pageParam });
    },
    enabled: !!params.q,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.artists?.next ||
        lastPage.albums?.next ||
        lastPage.playlists?.next ||
        lastPage.shows?.next ||
        lastPage.episodes?.next ||
        lastPage.audiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
    },
  });
};

export default useSearchItemsByKeyword;
