import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artists } from "./artist";
import { Show, SimplifiedAudiBook, SimplifiedEpisode, SimplifiedPlayList, Track } from "./playList";

// 검색 타입 enum
export enum SearchType {
  Track = "track",
  Album = "album",
  Playlist = "playlist",
  Show = "show",
  AudioBook = "audiobook",
  Artist = "artist",
}

// 검색 요청 파라미터 인터페이스
export interface SearchRequestParams {
  q: string;
  type: SearchType[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

// 검색 응답 타입 인터페이스
export interface SearchResponse {
  artists?: ApiResponse<Artists>;
  albums?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<Track>;
  playlists?: ApiResponse<SimplifiedPlayList>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks?: ApiResponse<SimplifiedAudiBook>;
}
