import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddTracksToPlaylistResponse } from "../models/playList";
import { addTracksToPlaylist } from "../apis/playListApi";
import { PAGE_LIMIT } from "../configs/commonConfig";

type AddTracksVars = {
  playlistId: string;
  uris: string[];
  position?: number;
};

const useAddTracksToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation<AddTracksToPlaylistResponse, Error, AddTracksVars>({
    mutationFn: ({ playlistId, uris, position }) => {
      return addTracksToPlaylist(playlistId, uris, position);
    },
    onSuccess: async (_data, variables) => {
      const playlistId = variables.playlistId;

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
