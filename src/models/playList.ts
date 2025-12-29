import type { ApiResponse } from "./apiResponse";
import { ExternalURLs, Image, Owner } from "./commonType";

// 현재 사용자 플레이 리스트 요청 타입
export interface GetCurrentUserPlayListRequest {
  limit?: number;
  offset?: number;
}

// 현재 사용자 플레이 리스트 응답 타입
export type GetCurrentUserPlayListResponse = ApiResponse<SimplifiedPlayList>;

// 현재사용자 플레이리스트 기본 타입
export interface SimplifiedPlayList {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;

  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  url?: string;
}
