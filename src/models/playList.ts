import type { ApiResponse } from "./apiResponse";
import { Artists } from "./artist";
import { ExternalURLs, Followers, Image, Owner, Restrictions } from "./commonType";

// 현재 사용자 플레이 리스트 요청 타입
export interface GetCurrentUserPlayListRequest {
  limit?: number;
  offset?: number;
}

// 현재 사용자 플레이 리스트 응답 타입
export type GetCurrentUserPlayListResponse = ApiResponse<SimplifiedPlayList>;

// 플레이리스트 공통 타입
export interface BasePlayList {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  url?: string;
}

// 현재사용자 플레이리스트 기본 타입(BasePlayList 확장)
export interface SimplifiedPlayList extends BasePlayList {
  tracks?: {
    href?: string;
    total?: number;
  };
}

// 선택한 플레이리스트 요청 타입
export interface GetPlayListRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_type?: string;
}

// 선택한 플레이리스트 응답 타입(BasePlayList 확장)
export interface Playlist extends BasePlayList {
  tracks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}

// 선택한 플레이리스트-트랙 타입
export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalURLs;
    followers: Followers;
    href?: string;
    id?: string;
    type?: string;
    url?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode; // 유니온타입
}

// 플레이리스트-트랙의 트랙 타입
export interface Track {
  album?: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_url: ExternalURLs;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    type: "album";
    uri: string;
    artists: Artists[];
  };
  artists?: Artists[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls: ExternalURLs;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url: string | null;
  track_number?: number;
  type?: "track"; // 필수 값이 아님
  uri?: string;
  is_local?: boolean;
}

// 플레이리스트-트랙의 에피소드 타입
export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode"; // 필수값
  uri: string;
  restrictions?: Restrictions;
  show: Show;
}

// 플레이리스트-트랙의 에피소드 타입에서 show 제외
export type SimplifiedEpisode = Omit<Episode, "show">;

// show 타입
export interface Show {
  available_markets: string[];
  copyrights: {
    text?: string;
    type?: string;
  };
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show"; // 필수 값
  uri: string;
  total_episodes: number;
}

export interface SimplifiedAudiBook {
  authors: {
    name?: string;
  };
  available_markets: string[];
  copyrights: {
    text?: string;
    type?: string;
  };
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name?: string;
  };
  publisher: string;
  type: "audiobook"; // 필수 값
  uri: string;
  total_chapters: number;
}

// 선택한 플레이리스트의 아이템 요청 타입
export interface GetPlayListItemsRequest extends GetPlayListRequest {
  offset?: number;
  limit?: number;
}

// 선택한 플레이리스트의 아이템 응답 타입
export type GetPlayListItemsResponse = ApiResponse<PlaylistTrack>;

// 플레이리스트 생성 요청 타입
export interface CreatePlayListRequest {
  name: string;
  // public?: boolean; // public은 프로그래밍에서 사용하는 이름이라 사용 할 수 없음
  playlistpublic?: boolean;
  collaborative?: boolean;
  description?: string;
}
