import React, { useState } from "react";
import { useEffect } from "react";
import { Track } from "../../../models/playList";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  styled,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import useAddTracksToPlaylist from "../../../hooks/useAddTracksToPlaylist";

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  playlistId?: string;
  onAdded?: () => void;
}

const SearchResultList = ({
  playlistId,
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onAdded,
}: SearchResultListProps) => {
  const [addingTrackId, setAddingTrackId] = useState<string | null>(null);
  // 스낵바 상태 관리
  const [snackbarOpen, setSnackbarOpen] = useState(false); // 스낵바 열림 상태
  const [snackbarMessage, setSnackbarMessage] = useState(""); // 스낵바 메시지
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success"); // 스낵바 심각도

  const mutation = useAddTracksToPlaylist(playlistId); // 커스텀 훅 사용

  const [ref, inView] = useInView({
    rootMargin: "200px 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAdd = (track: Track) => {
    if (!track.uri) return;
    setAddingTrackId(track.id);
    mutation.mutate([track.uri], {
      onSuccess: () => {
        onAdded?.();
        setSnackbarMessage(`"${track.name}"이(가) 플레이리스트에 추가되었습니다.`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : "트랙 추가에 실패했습니다.";
        setSnackbarMessage(message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      },

      onSettled: () => {
        setAddingTrackId(null);
      },
    });
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <StyledTableContainer>
        <TableBody sx={{ width: "100%" }}>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <AlbumImage src={track.album?.images?.[0]?.url} width="40px" />
                  </Box>
                  <Box>
                    <Typography className="title" fontWeight={700}>
                      {track.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {track.artists?.[0]?.name ?? "Unknown Artist"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>{track.album?.name}</TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleAdd(track)}
                  disabled={mutation.status === "pending" && addingTrackId === track.id}
                >
                  {mutation.status === "pending" && addingTrackId === track.id
                    ? "Adding..."
                    : "Add"}
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}

          {/* sentinel row (TableBody 안에서 안전한 구조) */}
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: "none", p: 0 }}>
              <Box ref={ref} sx={{ height: 1 }} />
              {isFetchingNextPage && <LoadingSpinner />}
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

const StyledTableContainer = styled("table")(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  position: "relative",

  width: "100%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  cursor: "pointer",
  transition: "all .3s ease",
  "& .MuiTableCell-root": { borderBottom: "none" },

  "&:hover .title": {
    color: theme.palette.primary.main,
  },
  "&:hover ": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "100%",
  marginRight: "12px",
});

export default SearchResultList;
