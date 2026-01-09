import React from "react";
import { SearchType } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { AlbumGrid, Section } from "../../../common/styles/commonStyled";
import { Typography } from "@mui/material";
import { TrackCard } from "../../../common/components/Card";

// 검색에서 트랙 컴포넌트
const Tracks = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "k-pop",
    type: [SearchType.Track],
    limit: 6,
  });

  console.log("Search Tracks Data: ", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];

  return (
    <Section>
      <Typography variant="h1" paddingBottom="8px">
        Tracks
      </Typography>

      {tracks.length > 0 ? (
        <AlbumGrid>
          {tracks.map((tracks) => (
            <TrackCard key={tracks.id} track={tracks} />
          ))}
        </AlbumGrid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </Section>
  );
};

export default Tracks;
