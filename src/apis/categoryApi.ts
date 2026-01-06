import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetCategoryRequest, GetCategoryResponse } from "../models/category";

// 카테고리 목록을 가져오는 함수(API)
export const getCategories = async (
  clientCredentialToken: string,
  params?: GetCategoryRequest
): Promise<GetCategoryResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw new Error("fail to fetch categories");
  }
};
