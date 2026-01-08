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
      <CardImage>
        <img src={image ? image : defaultImage} alt={name ?? "artist"} />
        <PlayButton />
      </CardImage>

      <TextWrap>
        <NameTypo>{name}</NameTypo>
        <ArtistTypo>{info}</ArtistTypo>
      </TextWrap>
    </CardContainer>
  );
};

export default OtherCard;

// 스타일드 컴포넌트
const CardContainer = styled("dl")(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  cursor: "pointer",
  transition: "all .3s ease",

  width: "100%",

  "&:hover ": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },

  "& .play-button": {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(.9)",
    transition: "all .2s ease",
    position: "absolute",
    top: "calc(50% - 15px)",
    left: "50%",
  },
  "&:hover .play-button": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
}));

const CardImage = styled("dt")(() => ({
  borderRadius: "10px",
  overflow: "hidden",

  "& img": {
    borderRadius: "10px",
    objectFit: "cover",
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
  },
}));

const TextWrap = styled("dd")(() => ({
  textAlign: "center",
  marginTop: 10,
  marginLeft: 0,
}));

const NameTypo = styled(Typography)(({ theme }) => ({
  width: 200,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "center",
  fontWeight: 500,
  fontSize: "1.2rem",

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
