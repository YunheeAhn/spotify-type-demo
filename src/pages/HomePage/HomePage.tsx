import React from "react";
import NewReleased from "./components/NewReleased";

// 공통 스타일 컴포넌트
import { Container } from "../../common/styles/commonStyled";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";

const HomePage = () => {
  return (
    <Container>
      <NewReleased />
      <Albums />
      <Tracks />
    </Container>
  );
};

export default HomePage;
