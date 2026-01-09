import React from "react";
import { styled, Typography } from "@mui/material";
import { SimplifiedAlbum } from "../../models/album";
import theme from "../../theme";
import PlayButton from "./PlayButton";
import { Track } from "../../models/playList";

interface AlbumCardProps {
  album: SimplifiedAlbum;
}

function AlbumCard({ album }: AlbumCardProps) {
  const artistName = album.artists?.[0]?.name ?? "Unknown Artist";

  return (
    <PlayButtonCard>
      <CardThumbnail>
        <img src={album.images[0]?.url} alt={album.name} />

        <PlayButton />
      </CardThumbnail>
      <CardInfo>
        <Typography component="p">{album.name}</Typography>
        <Typography component="p">{artistName}</Typography>
      </CardInfo>
    </PlayButtonCard>
  );
}

export default AlbumCard;

interface TrackCardProps {
  track: Track;
}

// 트랙 카드 컴포넌트
export function TrackCard({ track }: TrackCardProps) {
  const artistName = track.artists?.[0]?.name ?? "Unknown Artist";

  return (
    <PlayButtonCard>
      <CardThumbnail>
        <img src={track.album?.images[0]?.url} alt={track.name} />

        <PlayButton />
      </CardThumbnail>
      <CardInfo>
        <Typography component="p">{track.name}</Typography>
        <Typography component="p">{artistName}</Typography>
      </CardInfo>
    </PlayButtonCard>
  );
}

// 카드 컴포넌트
const PlayButtonCard = styled("dl")({
  width: "calc((100% - 100px) / 6)",
  borderRadius: "20px",

  padding: "10px",
  paddingBottom: "30px",
  boxSizing: "border-box",
  transition: "all .3s ease",
  cursor: "pointer",

  [theme.breakpoints.down("lg")]: {
    width: "calc((100% - 48px) / 4)",
  },

  [theme.breakpoints.down("md")]: {
    width: "calc((100% - 32px) / 3)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "calc((100% - 12px) / 2)",
  },

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:hover p:first-of-type": {
    color: theme.palette.primary.main,
  },

  "&:hover dt img": {
    transform: "scale(1.15)",
  },

  "& .play-button": {
    opacity: 0,
    transform: "scale(.9)",
    transition: "all .2s ease",
    position: "absolute",
    bottom: "15px",
    right: "15px",
  },
  "&:hover .play-button": { opacity: 1, transform: "scale(1)" },
});

// 카드 이미지 스타일
export const CardThumbnail = styled("dt")({
  width: "100%",
  borderRadius: "20px",
  overflow: "hidden",

  position: "relative",

  "& img": {
    width: "100%",
    height: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    transform: "scale(1.1)",
    transition: "all .3s ease",
  },
});

// 카드 정보
const CardInfo = styled("dd")({
  margin: 0,
  minWidth: 0,
  marginTop: "8px",

  "& p:first-of-type": {
    fontSize: "1.2rem",
    fontWeight: 800,
    marginBottom: "4px",
    transition: "all .3s ease",
  },
  "& p": {
    opacity: 0.7,
    cursor: "default",

    // 텍스트가 길 경우 말줄임표 처리
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
