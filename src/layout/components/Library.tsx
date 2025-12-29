import React, { useEffect } from "react";
import EmptyPlayList from "./EmptyPlayList";
import useGetCurrentUserPlayList from "../../hooks/useGetCurrentUserPlayList";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { styled } from "@mui/material";
import PlayList from "./PlayList";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import { useInView } from "react-intersection-observer";

const Library = () => {
  // 무한 스크롤
  const { ref, inView } = useInView();

  // 플레이리스트가 있으면 플레이리스트를 보여주고
  // 없으면 EmptyPlayList
  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCurrentUserPlayList({
      limit: 10,
      offset: 0,
    });
  // console.log("ddd", data);

  // 유저 api 데이터
  const { data: user } = useGetCurrentUserProfile();

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (!user) {
    // 유저 없으면 EmptyPlayList
    return <EmptyPlayList />;
  }
  if (isLoading) {
    // 로딩중
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlayList />
      ) : (
        <PlaylistContainer>
          {data?.pages.map((page, index) => {
            return <PlayList key={index} playlists={page.items} />;
          })}
          <div ref={ref}>
            {/* 무한스크롤용 div 태그 */}
            {isFetchingNextPage && <p>Loading</p>}
          </div>
        </PlaylistContainer>
      )}
    </div>
  );
};

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));

export default Library;
