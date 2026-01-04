import React from "react";
import { useEffect } from "react";
import { Track } from "../../../models/playList";
import { Box, Button, styled, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView({
    rootMargin: "200px 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
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
              <Button>Add</Button>
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
