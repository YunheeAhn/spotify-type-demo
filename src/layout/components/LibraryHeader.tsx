import React from "react";

import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlayList from "../../hooks/useCreatePlayList";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../utils/authSpotify";

const LibraryHeader = () => {
  const { mutate: createPlayList } = useCreatePlayList();
  const { data: userProfile } = useGetCurrentUserProfile();

  const accessToken = localStorage.getItem("access_token"); // 액세스토큰
  const allowedClick = !!accessToken && !!userProfile; // 엑세스토큰, 유저프로필 둘 다 있을 경우
  const handleCreatePlayList = () => {
    if (allowedClick) {
      // 로그인 상태
      // allowed click
      createPlayList({ name: "New PlayList" });
    } else {
      // 비로그인 상태
      // not allowed click
      getSpotifyAuthUrl(); // 스포티파이 인증 URL로 리다이렉트
    }
  };

  return (
    <Head>
      <HeadBox display={"flex"}>
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </HeadBox>

      <ButtonBox>
        <Button onClick={handleCreatePlayList}>
          <AddIcon />
        </Button>
      </ButtonBox>
    </Head>
  );
};

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  paddingBottom: "8px",
});

const HeadBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const ButtonBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
});

export default LibraryHeader;
