import React from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import { SearchType } from "../../../models/search";
import { AlbumGrid, Section } from "../../../common/styles/commonStyled";
import { Typography } from "@mui/material";
import AlbumCard from "../../../common/components/Card";

// 검색에서 앨범 컴포넌트
const Albums = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "k-pop",
    type: [SearchType.Album],
    limit: 6,
  });

  console.log("Search Albums Data: ", data);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const albums = data?.pages.flatMap((page) => page.albums?.items ?? []) ?? [];

  return (
    <Section>
      <Typography variant="h1" paddingBottom="8px">
        Albums
      </Typography>

      {albums.length > 0 ? (
        <AlbumGrid>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </AlbumGrid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </Section>
  );
};

export default Albums;
