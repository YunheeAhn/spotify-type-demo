import { useInfiniteQuery } from "@tanstack/react-query";
import type { GetPlayListItemsRequest } from "../models/playList";
import { GetPlayListItems } from "../apis/playListApi";

// 선택된 플레이리스트의 하위 아이템 가져오는 훅
export const useGetPlayListItems = (params: GetPlayListItemsRequest) => {
  // 리스트 아이템이 많을 경우 무한 스크롤
  return useInfiniteQuery({
    queryKey: ["play-list-items", params],
    queryFn: ({ pageParam }) => {
      return GetPlayListItems({ offset: pageParam, ...params });
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};
