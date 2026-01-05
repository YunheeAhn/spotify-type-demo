import { Box, InputAdornment, styled, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SearchType } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import ErrorMessage from "../../../common/components/ErrorMessage";

// 빈 플레이리스트 채우기 위한 검색 컴포넌트 props 인터페이스
interface EmptyPlaylistWithSearchProps {
  playlistId?: string;
  onAdded?: () => void;
}

// 빈 플레이리스트 채우기 위한 검색 컴포넌트
const SearchToFillEmptyPlaylist = ({ playlistId, onAdded }: EmptyPlaylistWithSearchProps) => {
  const [keyword, setKeyword] = useState<string>(""); // useState의 제네릭
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSearchItemsByKeyword({
      q: keyword,
      type: [SearchType.Track],
    });

  if (error) {
    // 에러가 발생했을 때 에러 메시지 표시
    return <ErrorMessage message="Failed to Search" />;
  }

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    // React.ChangeEvent<HTMLInputElement> : input에서 오는 event의 타입
    // keyword를 입력하면 입력 값 보여주기
    setKeyword(event.target.value);
  };

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;

  return (
    <SearchContainer ref={containerRef}>
      <Typography variant="h1" my="10px">
        Let’s fill this playlist!
      </Typography>

      <StyledTextField
        autoComplete="off"
        placeholder="Search for songs or artists"
        value={keyword}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
        onChange={handleSearchKeyword}
      />
      <Box mt={2}>
        {isLoading ? (
          // 검색 중일 때 로딩 스피너
          <LoadingSpinner />
        ) : hasResults ? (
          // 검색 결과가 있을 때 결과 리스트 보여주기
          <SearchResultList
            playlistId={playlistId}
            list={tracks}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            onAdded={onAdded}
          />
        ) : keyword === "" ? null : (
          // 검색어가 비어 있을 때
          // 검색 결과가 없을 때
          <div>{`No Result for "${keyword}"`}</div>
        )}
      </Box>
    </SearchContainer>
  );
};

export default SearchToFillEmptyPlaylist;

const SearchContainer = styled(Box)({
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": { display: "none" },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    borderRadius: "4px",
    backgroundColor: theme.palette.action.active,
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "transparent" },
    "&:hover fieldset": { borderColor: "gray" },
    "&.Mui-focused fieldset": { borderColor: "gray" },
  },
}));
