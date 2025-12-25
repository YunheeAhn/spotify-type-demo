import { Typography } from "@mui/material";
import { AlbumGrid, Section } from "../../../common/styles/commonStyled";
import useGetNewReleased from "../../../hooks/useGetNewReleased";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import AlbumCard from "../../../common/components/Card";

// 새로운 발매 앨범 섹션 컴포넌트
const NewReleased = () => {
  // 새로운 발매 앨범 데이터 가져오기
  const { data, error, isLoading } = useGetNewReleased();

  console.log("New Released Albums Data: ", data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <Section>
      <Typography variant="h1" paddingBottom="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <AlbumGrid>
          {data.albums.items.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </AlbumGrid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </Section>
  );
};

export default NewReleased;
