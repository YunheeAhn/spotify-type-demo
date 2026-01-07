import React from "react";
import { styled } from "@mui/material";
import { SimplifiedEpisode, SimplifiedPlayList, Track } from "../../../models/playList";
import { SimplifiedAlbum } from "../../../models/album";
import { Artists } from "../../../models/artist";
import PlayButton from "../../../common/components/PlayButton";

const defaultImage =
  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?semt=ais_hybrid&w=740&q=80";

interface TopResultProps {
  topResult: Track | SimplifiedAlbum | Artists | SimplifiedEpisode | SimplifiedPlayList | undefined;
}

const TopResult = ({ topResult }: TopResultProps) => {
  const isArtist = (
    topResult:
      | Track
      | SimplifiedAlbum
      | Artists
      | SimplifiedEpisode
      | SimplifiedPlayList
      | undefined
  ): topResult is Artists => {
    return topResult !== undefined && topResult.type === "artist";
  };

  const isTrack = (
    topResult:
      | Track
      | SimplifiedAlbum
      | Artists
      | SimplifiedEpisode
      | SimplifiedPlayList
      | undefined
  ): topResult is Track => {
    return topResult !== undefined && topResult.type === "track";
  };

  const isAlbum = (
    topResult:
      | Track
      | SimplifiedAlbum
      | Artists
      | SimplifiedEpisode
      | SimplifiedPlayList
      | undefined
  ): topResult is SimplifiedAlbum => {
    return topResult !== undefined && topResult.type === "album";
  };

  const isEpisode = (
    topResult:
      | Track
      | SimplifiedAlbum
      | Artists
      | SimplifiedEpisode
      | SimplifiedPlayList
      | undefined
  ): topResult is SimplifiedEpisode => {
    return topResult !== undefined && topResult.type === "episode";
  };

  const isPlaylist = (
    topResult:
      | Track
      | SimplifiedAlbum
      | Artists
      | SimplifiedEpisode
      | SimplifiedPlayList
      | undefined
  ): topResult is SimplifiedPlayList => {
    return topResult !== undefined && topResult.type === "playlist";
  };

  return (
    <Container>
      <PlayButtonWrapper>
        <PlayButton />
      </PlayButtonWrapper>

      <ResultImage
        src={
          isTrack(topResult)
            ? topResult.album?.images?.[0]?.url || defaultImage
            : topResult?.images?.[0]?.url || defaultImage
        }
        $isArtist={isArtist(topResult)}
      />

      <Title>{topResult?.name}</Title>

      <SubTitle>
        {isArtist(topResult) ? `아티스트` : ""}
        {isTrack(topResult) ? `곡 • ${topResult.artists?.[0]?.name}` : ""}
        {isAlbum(topResult) ? `앨범 • ${topResult?.artists[0].name}` : ""}
        {isEpisode(topResult) ? `에피소드 • ${topResult?.release_date}` : ""}
        {isPlaylist(topResult) ? `플레이리스트 • ${topResult?.owner?.display_name}` : ""}
      </SubTitle>
    </Container>
  );
};

export default TopResult;

// 스타일드 컴포넌트
const Container = styled("div")(() => ({
  position: "relative",
  padding: 20,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },

  "&:hover .playButton": {
    display: "block",
  },
}));

const PlayButtonWrapper = styled("div")(() => ({
  position: "absolute",
  bottom: 20,
  right: 15,
  transform: "translate(-50%, -50%)",
  display: "none",
  cursor: "pointer",
  transition: "opacity 1s ease",
  zIndex: 1,
}));

const ResultImage = styled("img")<{ $isArtist: boolean }>(({ $isArtist }) => ({
  width: 200,
  borderRadius: $isArtist ? "50%" : 10,
}));

const Title = styled("div")(() => ({
  fontSize: "x-large",
  fontWeight: 700,
  marginTop: 10,
}));

const SubTitle = styled("div")(() => ({
  marginTop: 5,
  color: "#999999",
}));
