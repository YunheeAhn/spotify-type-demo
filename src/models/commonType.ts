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
