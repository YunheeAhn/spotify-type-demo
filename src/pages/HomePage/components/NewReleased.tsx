import { Typography } from "@mui/material";
import { Section } from "../../../common/styles/commonStyled";
import useGetNewReleased from "../../../hooks/useGetNewReleased";

// 새로운 발매 앨범 섹션 컴포넌트
const NewReleased = () => {
  // 새로운 발매 앨범 데이터 가져오기
  const { data, error, isLoading } = useGetNewReleased();

  console.log("New Released Albums Data: ", data);

  return (
    <Section>
      <Typography variant="h1" paddingBottom="8px">
        New Released Albums
      </Typography>
    </Section>
  );
};

export default NewReleased;
