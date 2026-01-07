import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Grid, Typography, Alert, styled } from "@mui/material";
import { SearchType } from "../../models/search";

import { ApiResponse } from "../../models/apiResponse";
import { Playlist, SimplifiedEpisode, Track } from "../../models/playList";
import { Artists } from "../../models/artist";
import { SimplifiedAlbum } from "../../models/album";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import moment from "moment";
import SongsList from "./component/SongsList";
import ArtistCard from "./component/ArtistCard";
import TopResult from "./component/TopResult";
import OtherCard from "./component/OtherCard";

const SearchResultPage = () => {
  const { keyword } = useParams();
  const [tracks, setTracks] = useState<ApiResponse<Track> | null>(null);
  const [albums, setAlbums] = useState<ApiResponse<SimplifiedAlbum> | null>(null);
  const [artists, setArtists] = useState<ApiResponse<Artists> | null>(null);
  const [episodes, setEpisodes] = useState<ApiResponse<SimplifiedEpisode> | null>(null);
  const [playlists, setPlaylists] = useState<ApiResponse<Playlist> | null>(null);

  const [topResult, setTopResult] = useState<
    | ApiResponse<Track>
    | ApiResponse<SimplifiedAlbum>
    | ApiResponse<Artists>
    | ApiResponse<SimplifiedEpisode>
    | ApiResponse<Playlist>
    | null
  >(null);

  const { data } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [
      SearchType.Track,
      SearchType.Album,
      SearchType.Playlist,
      SearchType.Show,
      SearchType.Episode,
      SearchType.AudioBook,
      SearchType.Artist,
    ],
    limit: 10,
  });

  const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?semt=ais_hybrid&w=740&q=80";

  useEffect(() => {
    if (data?.pages[0]) {
      if (data.pages[0].tracks) {
        setTracks(data.pages[0].tracks);
      }
      if (data.pages[0].albums) {
        setAlbums(data.pages[0].albums);
      }
      if (data.pages[0].artists) {
        setArtists(data.pages[0].artists);
      }
      if (data.pages[0].episodes) {
        setEpisodes(data.pages[0].episodes);
      }
      if (data.pages[0].playlists) {
        setPlaylists(data.pages[0].playlists);
      }
    }
  }, [data]);

  useEffect(() => {
    if (
      tracks?.items.length !== undefined &&
      tracks?.items.length > 0 &&
      tracks?.items[0] !== null
    ) {
      setTopResult(tracks);
    } else if (
      albums?.items.length !== undefined &&
      albums?.items.length > 0 &&
      albums?.items[0] !== null
    ) {
      setTopResult(albums);
    } else if (
      artists?.items.length !== undefined &&
      artists?.items.length > 0 &&
      artists?.items[0] !== null
    ) {
      setTopResult(artists);
    } else if (
      episodes?.items.length !== undefined &&
      episodes?.items.length > 0 &&
      episodes?.items[0] !== null
    ) {
      setTopResult(episodes);
    } else if (
      playlists?.items.length !== undefined &&
      playlists?.items.length > 0 &&
      playlists?.items[0] !== null
    ) {
      setTopResult(playlists);
    }
  }, [tracks, albums, artists, episodes, playlists]);

  if (
    tracks?.items.length === 0 &&
    albums?.items.length === 0 &&
    artists?.items.length === 0 &&
    episodes?.items.length === 0 &&
    playlists?.items.length === 0
  ) {
    return (
      <Alert severity="warning" style={{ marginTop: "15px" }}>
        '{keyword}'에 대한 검색 결과가 없습니다.
      </Alert>
    );
  }

  return (
    <SearchKeywordContainer>
      <Grid container spacing={2} marginTop="24px">
        {topResult && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" pb={"8px"}>
              상위 결과
            </Typography>
            <TopResult topResult={topResult?.items[0]}></TopResult>
          </Grid>
        )}
        {tracks && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h1" pb={"8px"}>
              곡
            </Typography>
            <SongsList tracks={tracks?.items.slice(0, 5)}></SongsList>
          </Grid>
        )}
        {artists && !artists.items.every((artist) => artist === null) && (
          <SectionContainer>
            <Typography variant="h1" pb={"8px"}>
              아티스트
            </Typography>
            <Grid container spacing={2}>
              {artists.items
                .filter((item) => item !== null && item !== undefined)
                .slice(0, 6)
                .map((item) => (
                  <Grid key={item.id} size={{ xs: 6, md: 2 }} display="flex">
                    <ArtistCard
                      image={item.images?.[0]?.url ?? defaultImage}
                      name={item.name ?? "Unknown Artist"}
                    />
                  </Grid>
                ))}
            </Grid>
          </SectionContainer>
        )}
        {albums && !albums.items.every((album) => album === null) && (
          <SectionContainer>
            <Typography variant="h1" pb={"8px"}>
              앨범
            </Typography>
            <Grid container spacing={2}>
              {albums.items
                .filter((item) => item !== null && item !== undefined)
                .slice(0, 6)
                .map((item) => (
                  <Grid key={item.id} size={{ xs: 6, md: 2 }} display="flex">
                    <OtherCard
                      image={item.images?.[0]?.url}
                      name={item.name}
                      info={
                        item.release_date
                          ? `${moment(item.release_date).format("yyyy")} • ${item.artists[0].name}`
                          : item.artists[0].name
                      }
                    />
                  </Grid>
                ))}
            </Grid>
          </SectionContainer>
        )}
        {episodes && !episodes.items.every((episode) => episode === null) && (
          <SectionContainer>
            <Typography variant="h1" pb={"8px"}>
              에피소드
            </Typography>
            <Grid container spacing={2}>
              {episodes.items
                .filter((item) => item !== null && item !== undefined)
                .slice(0, 6)
                .map((item) => (
                  <Grid key={item.id} size={{ xs: 6, md: 2 }} display="flex">
                    <OtherCard
                      image={item.images?.[0]?.url}
                      name={item.name}
                      info={
                        item.release_date
                          ? `${moment(item.release_date).format("yyyy-MM")} • ${moment(
                              item.duration_ms
                            ).format("mm")}분`
                          : `${moment(item.duration_ms).format("mm")}분`
                      }
                    />
                  </Grid>
                ))}
            </Grid>
          </SectionContainer>
        )}
        {playlists && !playlists.items.every((playlist) => playlist === null) && (
          <SectionContainer>
            <Typography variant="h1" pb={"8px"}>
              플레이리스트
            </Typography>
            <Grid container spacing={2}>
              {playlists.items
                .filter((item) => item !== null && item !== undefined)
                .slice(0, 6)
                .map((item) =>
                  item !== null ? (
                    <Grid key={item.id} size={{ xs: 6, md: 2 }} display="flex">
                      <OtherCard
                        image={item.images?.[0]?.url}
                        name={item.name}
                        info={
                          item.owner
                            ? `만든 사람: ${item.owner.display_name}`
                            : `만든 사람: Unknown`
                        }
                      />
                    </Grid>
                  ) : (
                    ""
                  )
                )}
            </Grid>
          </SectionContainer>
        )}
      </Grid>
    </SearchKeywordContainer>
  );
};

export default SearchResultPage;

// 스타일드 컴포넌트
const SearchKeywordContainer = styled("div")(() => ({
  height: "calc(100% - 70px)",
  overflowY: "auto",
  marginBottom: 10,
  padding: 20,

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 6,
  },
}));

const SectionContainer = styled("div")(() => ({
  width: "100%",
}));
