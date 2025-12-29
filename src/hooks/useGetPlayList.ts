import { useQuery } from "@tanstack/react-query";
import type { GetPlayListRequest } from "../models/playList";
import { getPlayList } from "../apis/playListApi";

// 선택한 플레이리스트 가져오는 훅
const useGetPlayList = (params: GetPlayListRequest) => {
  return useQuery({
    queryKey: ["play-list-detail", params.playlist_id],
    queryFn: () => {
      return getPlayList(params);
    },
    // id값이 있을 때만 호출
    enabled: !!params.playlist_id,
  });
};

export default useGetPlayList;
