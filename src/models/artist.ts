import type { ExternalURLs, Followers, Image } from "./commonType";

// 아티스트 타입
export interface Artists {
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;

  followers?: Followers;
  genres?: string[];
  popularity?: number;
  images?: Image[];
}
