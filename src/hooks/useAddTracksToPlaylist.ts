import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddTracksToPlaylistResponse } from "../models/playList";
import { addTracksToPlaylist } from "../apis/playListApi";
import { PAGE_LIMIT } from "../configs/commonConfig";

const useAddTracksToPlaylist = (playlistId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<AddTracksToPlaylistResponse, Error, string[]>({
    mutationFn: (uris: string[]) => {
      if (!playlistId) return Promise.reject(new Error("playlistId is not defined"));
      return addTracksToPlaylist(playlistId, uris);
    },
    onSuccess: async () => {
      if (!playlistId) return;

      await queryClient.invalidateQueries({
        queryKey: ["play-list-items", { playlist_id: playlistId, limit: PAGE_LIMIT }],
      });

      await queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlistId],
      });

      await queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });

      await queryClient.refetchQueries({ queryKey: ["playlist-detail", playlistId] });
      await queryClient.refetchQueries({
        queryKey: ["play-list-items", { playlist_id: playlistId, limit: PAGE_LIMIT }],
      });
    },
  });
};

export default useAddTracksToPlaylist;
