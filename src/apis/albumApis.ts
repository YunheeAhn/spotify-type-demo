import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import type { getNewReleasesResponse } from "../models/album";

// 새로운 발매 앨범을 가져오는 함수
export const getNewReleases = async (
  getClientCredentialToken: string
): Promise<getNewReleasesResponse> => {
  try {
    // Spotify API의 새로운 발매 앨범 엔드포인트에 요청
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
      headers: {
        Authorization: `Bearer ${getClientCredentialToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch new releases");
  }
};
