import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Typography, Alert, styled } from "@mui/material";
import { SearchType } from "../../models/search";

import { ApiResponse } from "../../models/apiResponse";
import { SimplifiedEpisode, SimplifiedPlayList, Track } from "../../models/playList";
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
  const [playlists, setPlaylists] = useState<ApiResponse<SimplifiedPlayList> | null>(null);

  const [topResult, setTopResult] = useState<
    | ApiResponse<Track>
    | ApiResponse<SimplifiedAlbum>
    | ApiResponse<Artists>
    | ApiResponse<SimplifiedEpisode>
    | ApiResponse<SimplifiedPlayList>
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
      <TopSection>
        {topResult && (
          <div>
            <Typography variant="h1" pb={"8px"}>
              TOP RESULT
            </Typography>
            <TopResult topResult={topResult?.items[0]}></TopResult>
          </div>
        )}
        {tracks && (
          <div>
            <Typography variant="h1" pb={"8px"}>
              SONGS
            </Typography>
            <SongsList tracks={tracks?.items.slice(0, 5)}></SongsList>
          </div>
        )}
      </TopSection>

      {artists && !artists.items.every((artist) => artist === null) && (
        <SectionContainer>
          <Typography variant="h1" pb={"8px"}>
            ARTIST
          </Typography>
          <CardSection>
            {artists.items
              .filter((item) => item !== null && item !== undefined)
              .slice(0, 6)
              .map((item) => (
                <CardWrap key={item.id}>
                  <ArtistCard
                    image={item.images?.[0]?.url ?? defaultImage}
                    name={item.name ?? "Unknown Artist"}
                  />
                </CardWrap>
              ))}
          </CardSection>
        </SectionContainer>
      )}
      {albums && !albums.items.every((album) => album === null) && (
        <SectionContainer>
          <Typography variant="h1" pb={"8px"}>
            ALBUMS
          </Typography>
          <CardSection>
            {albums.items
              .filter((item) => item !== null && item !== undefined)
              .slice(0, 6)
              .map((item) => (
                <CardWrap>
                  <OtherCard
                    image={item.images?.[0]?.url}
                    name={item.name}
                    info={
                      item.release_date
                        ? `${moment(item.release_date).format("yyyy")} • ${item.artists[0].name}`
                        : item.artists[0].name
                    }
                  />
                </CardWrap>
              ))}
          </CardSection>
        </SectionContainer>
      )}
      {episodes && !episodes.items.every((episode) => episode === null) && (
        <SectionContainer>
          <Typography variant="h1" pb={"8px"}>
            EPISODES
          </Typography>
          <CardSection>
            {episodes.items
              .filter((item) => item !== null && item !== undefined)
              .slice(0, 6)
              .map((item) => (
                <CardWrap key={item.id}>
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
                </CardWrap>
              ))}
          </CardSection>
        </SectionContainer>
      )}
      {playlists && !playlists.items.every((playlist) => playlist === null) && (
        <SectionContainer>
          <Typography variant="h1" pb={"8px"}>
            PLAYLISTS
          </Typography>
          <CardSection>
            {playlists.items
              .filter((item) => item !== null && item !== undefined)
              .slice(0, 6)
              .map((item) =>
                item !== null ? (
                  <CardWrap key={item.id}>
                    <OtherCard
                      image={item.images?.[0]?.url}
                      name={item.name}
                      info={
                        item.owner ? `만든 사람: ${item.owner.display_name}` : `만든 사람: Unknown`
                      }
                    />
                  </CardWrap>
                ) : (
                  ""
                )
              )}
          </CardSection>
        </SectionContainer>
      )}
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

const TopSection = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  gap: 40,
  marginBottom: 40,

  "& > div": { flex: 1 },

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const CardSection = styled("section")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "40px",

  [theme.breakpoints.down("md")]: {
    gap: "15px",
    marginBottom: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "10px",
    marginBottom: "20px",
  },
}));

const CardWrap = styled("div")(({ theme }) => ({
  width: "calc((100% - 80px) / 5)",

  [theme.breakpoints.down("lg")]: {
    width: "calc((100% - 60px) / 4)",
  },

  [theme.breakpoints.down("md")]: {
    width: "calc((100% - 30px) / 3)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "calc((100% - 10px) / 2)",
  },
}));
