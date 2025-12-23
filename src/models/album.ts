import { Artists } from "./artist";
import { ExternalURLs, Image, Restrictions } from "./commonType";

// 새로운 발매 앨범 응답 타입
export interface getNewReleasesResponse {
  albums: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;

    items: SimplifiedAlbum[];
  };
}

// 앨범 타입
export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: Artists[];
}
