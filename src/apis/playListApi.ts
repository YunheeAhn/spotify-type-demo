import api from "../utils/api";
import type {
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
