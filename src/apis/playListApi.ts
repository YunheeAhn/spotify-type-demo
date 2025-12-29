import api from "../utils/api";
import type {
  GetCurrentUserPlayListRequest,
  GetCurrentUserPlayListResponse,
} from "../models/playList";

// play list 불러오는 api
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
