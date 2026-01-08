import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AddTracksToPlaylistResponse } from "../models/playList";
import { addTracksToPlaylist } from "../apis/playListApi";

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
    onSuccess: async (_data, { playlistId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["play-list-detail", playlistId] }),
        queryClient.invalidateQueries({ queryKey: ["play-list-items"] }),
        queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] }),
      ]);

      await Promise.all([
        queryClient.refetchQueries({ queryKey: ["play-list-detail", playlistId] }),
        queryClient.refetchQueries({ queryKey: ["play-list-items"] }),
        queryClient.refetchQueries({ queryKey: ["current-user-playlists"] }),
      ]);
    },
  });
};

export default useAddTracksToPlaylist;
