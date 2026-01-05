import api from "../utils/api";
import type {
  AddTracksToPlaylistRequest,
  AddTracksToPlaylistResponse,
  CreatePlayListRequest,
  GetCurrentUserPlayListRequest,
  GetCurrentUserPlayListResponse,
  GetPlayListItemsRequest,
  GetPlayListItemsResponse,
  GetPlayListRequest,
  Playlist,
} from "../models/playList";

// 현재 유저의 play list 불러오는 api
const GetCurrentUserPlayList = async ({
  limit,
  offset,
}: GetCurrentUserPlayListRequest): Promise<GetCurrentUserPlayListResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch current user playlists");
  }
};

export default GetCurrentUserPlayList;

// 선택된 play list 불러오는 api
export const getPlayList = async (params: GetPlayListRequest): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params: params,
    });

    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch playlist details");
  }
};

// 선택된 play list의 아이템들을 불러오는 api
export const GetPlayListItems = async (
  params: GetPlayListItemsRequest
): Promise<GetPlayListItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Fail to fetch playlist items");
  }
};

// 플레이리스트 생성하는 api
export const CreatePlayList = async (
  user_id: string,
  params: CreatePlayListRequest
): Promise<Playlist> => {
  try {
    const { name, playlistpublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistpublic,
      collaborative,
      description,
    });

    return response.data;
  } catch (error) {
    throw new Error("Fail to create playlist");
  }
};

// 플레이리스트 트랙에 추가하는 api
export const addTracksToPlaylist = async (
  playlist_id: string,
  uris: string[],
  position?: number
): Promise<AddTracksToPlaylistResponse> => {
  try {
    // 요청 타입 명시
    const body: AddTracksToPlaylistRequest = position !== undefined ? { uris, position } : { uris };
    // axios 제네릭에 응답 타입을 넣어 response.data의 타입을 보장
    const response = await api.post<AddTracksToPlaylistResponse>(
      `/playlists/${playlist_id}/tracks`,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add tracks to playlist", error);
    throw error;
  }
};
