import { styled } from "@mui/material";
import theme from "../../theme";

// 각페이지를 감싸는 컨테이너
export const Container = styled("div")({
  padding: "20px",
  boxSizing: "border-box",
});

// 페이지 안 섹션 구분용 컴포넌트
export const Section = styled("div")({
  "& + &": {
    marginTop: "20px",
  },

  [theme.breakpoints.down("md")]: {
    "& + &": { marginTop: "16px" },
  },
  [theme.breakpoints.down("sm")]: {
    "& + &": { marginTop: "12px" },
  },
});

// 앨범 카드들을 감싸는 그리드 컴포넌트
export const AlbumGrid = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  [theme.breakpoints.down("lg")]: {
    gap: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },
});
