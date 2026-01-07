import React from "react";
import { Typography, styled } from "@mui/material";
import PlayButton from "../../../common/components/PlayButton";

const defaultImage =
  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?semt=ais_hybrid&w=740&q=80";

interface OtherCardProps {
  image: string | undefined;
  name: string | undefined;
  info: string | undefined;
}

const OtherCard = ({ image, name, info }: OtherCardProps) => {
  return (
    <CardContainer>
      <CardImage src={image ? image : defaultImage} alt={name ?? "image"} />

      <PlayButtonWrapper>
        <PlayButton />
      </PlayButtonWrapper>

      <NameTypo marginTop={"10px"} fontWeight={700} fontSize="larger">
        {name}
      </NameTypo>

      <ArtistTypo marginTop={"10px"}>{info}</ArtistTypo>
    </CardContainer>
  );
};

export default OtherCard;

// 스타일드 컴포넌트

const CardContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  width: "100%",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },

  "&:hover .playButton": {
    display: "block",
  },
}));

const CardImage = styled("img")(({ theme }) => ({
  width: 200,
  height: 200,
  borderRadius: 10,
  objectFit: "cover",

  [theme.breakpoints.down("lg")]: {
    width: 100,
    height: 100,
  },
}));

const NameTypo = styled(Typography)(({ theme }) => ({
  width: 200,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  [theme.breakpoints.down("lg")]: {
    width: 100,
  },
}));

const ArtistTypo = styled(Typography)(({ theme }) => ({
  width: 200,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#797979",

  [theme.breakpoints.down("lg")]: {
    width: 100,
  },
}));

const PlayButtonWrapper = styled("div")(() => ({
  position: "absolute",
  bottom: 5,
  right: 0,
  transform: "translate(-50%, -50%)",
  display: "none",
  cursor: "pointer",
  transition: "opacity 1s ease",
  zIndex: 1,

  ".MuiBox-root:hover &": {
    display: "block",
  },
}));
