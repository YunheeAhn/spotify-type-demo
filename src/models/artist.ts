import type { ExternalURLs } from "./commonType";

// 아티스트 타입
export interface Artists {
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}
