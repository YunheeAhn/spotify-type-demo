import React from "react";
import { Navigate, useParams } from "react-router";
import useGetPlayList from "../../hooks/useGetPlayList";
import { Box, Grid, styled, Typography } from "@mui/material";

// 선택한 플레이리스트 디테일 페이지(사이드바 플레이리스트 클릭시 이동)
const PlaylistDetailPage = () => {
  // url 에서 선택한 플레이리스트의 id값 읽어오기
  const { id } = useParams<{ id: string }>();

  // 플레이리스트의 id값으로 선택한 플레이리스트 가져오기
  const { data: playList } = useGetPlayList({ playlist_id: id as string });

  if (!id) {
    // url 에서 선택한 플레이리스트의 id값 없으면 홈으로
    return <Navigate to="/" />;
  }

  console.log("선택한 플레이리스트", playList);
  return (
    <PlaylistHeader container spacing={7}>
      <ImageGrid>
        {playList?.images ? (
          <AlbumImage src={playList?.images[0].url} alt="playlist_cover.jpg" />
        ) : (
          <p>기본이미지</p>
        )}
      </ImageGrid>
      <Grid>
        <Box>
          <ResponsiveTypography variant="h1" color="white">
            {playList?.name}
          </ResponsiveTypography>

          <Box display="flex" alignItems="center">
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
            />
            <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
              {playList?.owner?.display_name ? playList?.owner.display_name : "unknown"}
            </Typography>
            <Typography variant="subtitle1" color="white">
              • {playList?.tracks?.total} songs
            </Typography>
          </Box>
        </Box>
      </Grid>
    </PlaylistHeader>
  );
};

export default PlaylistDetailPage;

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
