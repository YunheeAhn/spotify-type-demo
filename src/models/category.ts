import type { ApiResponse } from "./apiResponse";
import type { Image } from "./commonType";

// 카테고리 정보 타입
export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

// 카테고리 조회 요청 타입
export interface GetCategoryRequest {
  country?: string;
  locale?: string;
  limit?: number;
  offset?: number;
}

// 카테고리 조회 응답 타입
export interface GetCategoryResponse {
  categories: ApiResponse<Category>;
}
