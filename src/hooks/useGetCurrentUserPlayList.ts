// 로그인 한 현재 유저의 플레이 리스트 가져오기

import { useInfiniteQuery } from "@tanstack/react-query";
import GetCurrentUserPlayList from "../apis/playListApi";
import type { GetCurrentUserPlayListRequest } from "../models/playList";

const useGetCurrentUserPlayList = ({ limit }: GetCurrentUserPlayListRequest) => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return GetCurrentUserPlayList({ limit, offset: pageParam });
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");

        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return 10;
    },
  });
};

export default useGetCurrentUserPlayList;
