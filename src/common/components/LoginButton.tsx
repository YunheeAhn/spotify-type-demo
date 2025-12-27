import React from "react";
import { Button } from "@mui/material";
import { getSpotifyAuthUrl } from "../../utils/authSpotify";

// 로그인 컴포넌트
const LoginButton = () => {
  // 로그인 처리 함수
  const login = () => {
    getSpotifyAuthUrl(); // 스포티파이 인증 URL로 리다이렉트
  };

  return (
    <Button variant="contained" color="secondary" size="large" onClick={login}>
      Login
    </Button>
  );
};

export default LoginButton;
