import React from "react";
import type { Episode, PlaylistTrack, Track } from "../../../models/playList";
import { styled, TableCell, TableRow } from "@mui/material";
import moment from "moment";

interface DesktopPlayListItemProps {
  index: number;
  item: PlaylistTrack; // episode엔 album이 없어서 타입좁히기 해야 함
}

const DesktopPlayListItem = ({ item, index }: DesktopPlayListItemProps) => {
  // PlaylistTrack 타입 좁히기
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || "No Name"}</TableCell>
      <TableCell>{isEpisode(item.track) ? "N/A" : item.track.album?.name}</TableCell>
      <TableCell>
        {item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "UNKNOWN"}
      </TableCell>
      <TableCell>{moment(item.track.duration_ms).format("mm:ss") || "UNKNOWN"}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlayListItem;

// styled component
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all .3s ease",
  "& td": {
    border: "none",
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));
