import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreatePlayList } from "../apis/playListApi";
import { useGetCurrentUserProfile } from "./useGetCurrentUserProfile";
import { CreatePlayListRequest } from "../models/playList";

// 플레이리스트 생성하는 훅

const useCreatePlayList = () => {
  const queryClient = useQueryClient();
  // user profile -> user id 값 받아오기
  const { data: user } = useGetCurrentUserProfile();

  return useMutation({
    mutationFn: (params: CreatePlayListRequest) => {
      if (user) {
        return CreatePlayList(user?.id as string, params);
      }

      return Promise.reject(new Error("User is not defined"));
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlayList;
