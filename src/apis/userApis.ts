import api from "../utils/api";
import type { User } from "../models/user";

// 현재 사용자 프로필을 가져오는 함수(API)
export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(`/me`);

    return response.data;
  } catch (error) {
    console.log("Failed to fetch current user profile", error);
    throw new Error("Failed to fetch current user profile");
  }
};
