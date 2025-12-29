// 공통 타입 정의

// 외부 URL 타입
export interface ExternalURLs {
  spotify?: string;
}

// 이미지 타입
export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

// 제약 조건 타입
export interface Restrictions {
  reason: string;
}

// 팔로워 타입
export interface Followers {
  href?: string | null;
  total?: number;
}

// explicit_content 타입
export interface Explicit {
  filter_enabled?: boolean;
  filter_locked?: boolean;
}

// owner 타입
export interface Owner {
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  type?: string;
  url?: string;
  display_name?: string | null;
}
