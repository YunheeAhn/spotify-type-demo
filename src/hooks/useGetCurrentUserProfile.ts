import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../apis/userApis";
import type { User } from "../models/user";

// 현재 사용자 프로필을 가져오는 커스텀 훅
export const useGetCurrentUserProfile = (): UseQueryResult<User, Error> => {
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["current-User-Profile"],
    queryFn: getCurrentUserProfile,
    enabled: !!accessToken, // accessToken이 있을 때만 쿼리 실행
    staleTime: 0,
  });
};
