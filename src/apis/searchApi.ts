// // 검색 관련 api

import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { SearchRequestParams, SearchResponse } from "../models/search";

// 키워드로 아이템 검색
export const SearchItemsByKeyword = async (
  token: string,
  params: SearchRequestParams
): Promise<SearchResponse> => {
  try {
    // 검색은 로그인 여부와 관계없이 제공해야 함
    // 기존 api 인스턴스는 access_token이 필수라서 사용이 제한됨
    // 따라서 비로그인/로그인 모두 대응하기 위해 axios를 직접 사용
    // 이 구조는 플레이리스트 Empty 상태뿐 아니라 메인 검색에서도 재사용 예정

    // 검색 파라미터 구성
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q); // 필수값
    searchParams.append("type", params.type.join(",")); // 필수값
    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external) searchParams.append("include_external", params.include_external);

    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error("Fail to Search by Keyword");
  }
};
