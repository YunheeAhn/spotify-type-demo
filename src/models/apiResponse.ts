// api response 관련 타입

// 플레이리스트 관련
export interface ApiResponse<T> {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string | null;
  total: number;
  items: T[]; // 제네릭
}
