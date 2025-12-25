import React from "react";
import NewReleased from "./components/NewReleased";

// 공통 스타일 컴포넌트
import { Container } from "../../common/styles/commonStyled";

const HomePage = () => {
  return (
    <Container>
      <NewReleased />
    </Container>
  );
};

export default HomePage;
