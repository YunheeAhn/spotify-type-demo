import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlayList from "../../hooks/useGetPlayList";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetPlayListItems } from "../../hooks/useGetPlayListItems";
import DesktopPlayListItem from "./component/DesktopPlayListItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import ErrorMessage from "../../common/components/ErrorMessage";
import MobilePlayListItem from "./component/MobilePlayListItem";
import SearchToFillEmptyPlaylist from "./component/SearchToFillEmptyPlaylist";

// 선택한 플레이리스트 디테일 페이지(사이드바 플레이리스트 클릭시 이동)
const PlaylistDetailPage = () => {
  // url 에서 선택한 플레이리스트의 id값 읽어오기
  const { id } = useParams<{ id: string }>();
  const playlistId = id ?? "";
  const accessToken = localStorage.getItem("access_token");

  // 플레이리스트 추가 시 페이지 상태 변환
  const [forceShowItems, setForceShowItems] = useState(false);

  // 플레이리스트의 id값으로 선택한 플레이리스트 가 져오기
  const { data: playList, error: playListError } = useGetPlayList({ playlist_id: playlistId });

  // 플레이리스트의 아이템 가져오기, 무한스크롤
  const {
    data: playListItems,
    isLoading: isPlayListItemsLoading,
    error: playListItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlayListItems({ playlist_id: id as string, limit: PAGE_LIMIT });

  // 무한 스크롤 useEffect
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 반응형에 따른 컴포넌트 변경
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  // url 에서 선택한 플레이리스트의 id값 없으면 홈으로
  if (!id) return <Navigate to="/" />;

  const isEmpty = (playList?.tracks?.total ?? 0) === 0;

  // 로그아웃 상태면 로그인 유도
  if (!accessToken) {
    return (
      <StyledTableContainer>
        <ErrorMessage message="다시 로그인 하세요" />
      </StyledTableContainer>
    );
  }

  // 로딩 처리
  if (isPlayListItemsLoading) {
    return (
      <StyledTableContainer>
        <Box p={3}>
          <Typography color="white">Loading...</Typography>
        </Box>
      </StyledTableContainer>
    );
  }

  // 에러 처리
  const getStatus = (err: any) => err?.response?.status ?? err?.status ?? err?.error?.status;
  const isUnauthorized = (err: any) => getStatus(err) === 401; // 401 에러 상태

  // 플레이리스트 에러, 플레이리스트 아이템 에러 결합
  const combinedError = playListError || playListItemsError;

  if (combinedError) {
    if (isUnauthorized(combinedError)) {
      return (
        // 401에러 상태
        <StyledTableContainer>
          <ErrorMessage message="다시 로그인 하세요" />
        </StyledTableContainer>
      );
    }

    return (
      // 그 외 에러
      <StyledTableContainer>
        <ErrorMessage message="Failed to load" />
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer>
      <PlaylistHeader>
        {/* 이미지 영역 */}
        <ImageSection>
          {playList?.images?.[0]?.url ? (
            <AlbumImage src={playList.images[0].url} alt="playlist_cover.jpg" />
          ) : (
            <DefaultImage />
          )}
        </ImageSection>

        {/* 텍스트 영역 */}
        <TextSection>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playList?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center" flexWrap="wrap">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
                alt="spotify-icon"
              />
              <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
                {playList?.owner?.display_name ? playList.owner.display_name : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playList?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </TextSection>
      </PlaylistHeader>

      {/* 플레이리스트 아이템 영역 */}
      {isEmpty && !forceShowItems ? (
        <SearchToFillEmptyPlaylist playlistId={id} onAdded={() => setForceShowItems(true)} />
      ) : (
        <div>
          {isDesktop ? (
            // 데스크탑
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadTitle>#</TableHeadTitle>
                  <TableHeadTitle>Title</TableHeadTitle>
                  <TableHeadTitle>Album</TableHeadTitle>
                  <TableHeadTitle>Date Added</TableHeadTitle>
                  <TableHeadTitle>Duration</TableHeadTitle>
                </TableRow>
              </TableHead>

              <TableBody>
                {playListItems?.pages.map((page, pageIndex) =>
                  page.items.map((item, itemNum) => (
                    <DesktopPlayListItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + itemNum + 1}
                      index={pageIndex * PAGE_LIMIT + itemNum + 1}
                    />
                  ))
                )}

                <TableRow sx={{ height: "5px" }} ref={ref} />
                {isFetchingNextPage && <p>Loading</p>}
              </TableBody>
            </Table>
          ) : (
            // 모바일
            <div>
              {playListItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemNum) => {
                  const index = pageIndex * PAGE_LIMIT + itemNum + 1;
                  return <MobilePlayListItem key={index} item={item} index={index} />;
                })
              )}

              <Box ref={ref} height="1px" />
              {isFetchingNextPage && <Typography>Loading...</Typography>}
            </div>
          )}
        </div>
      )}
    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;

// 스타일드 컴포넌트
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

const TableHeadTitle = styled(TableCell)(() => ({
  fontSize: "1.2rem",
  fontWeight: "700",
}));

const PlaylistHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "20px",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
}));

const ImageSection = styled("div")(({ theme }) => ({
  width: "260px",
  height: "260px",
  borderRadius: "100%",
  marginRight: "20px",
  overflow: "hidden",
  position: "relative",
  border: "2px solid silver",

  [theme.breakpoints.down("md")]: {
    width: "200px",
    height: "200px",
  },

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "160px",
    height: "160px",
    marginRight: 0,
  },

  "&::before": {
    position: "absolute",
    display: "block",
    content: '""',
    width: "16%",
    height: "16%",
    borderRadius: "100%",
    backgroundColor: theme.palette.background.paper,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: "1",
  },

  "&::after": {
    position: "absolute",
    display: "block",
    content: '""',
    width: "20%",
    height: "20%",
    borderRadius: "100%",
    backgroundColor: theme.palette.secondary.main,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    opacity: "0.4",
  },
}));

const AlbumImage = styled("img")(() => ({
  height: "100%",
  width: "100%",
  objectFit: "cover",
}));

const TextSection = styled("div")(({ theme }) => ({
  width: "calc(100% - 260px)",
  "& h1": {
    fontSize: "3rem",
    marginBottom: "10px",
  },

  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 200px)",

    "& h1": {
      fontSize: "2rem",
    },
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",

    display: "flex",
    justifyContent: "center",

    "& h1": {
      textAlign: "center",
      fontSize: "1.6  rem",
    },
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const DefaultImage = styled("div")(({ theme }) => ({
  width: "260px",
  height: "260px",
  borderRadius: "100%",
  marginRight: "20px",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.action.active,

  [theme.breakpoints.down("md")]: {
    width: "200px",
    height: "200px",
  },

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "160px",
    height: "160px",
    marginRight: 0,
  },
}));
