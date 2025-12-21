import { Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";

// 리액트-타입스크립트 스포티파이 페이지 구성목록
// 0. 사이드바(플레이리스트, 메뉴)
// 1. 홈페이지(랜딩) '/' <HomePage />
// 2. 검색 페이지 '/search' <SearchPage />
// 3. 검색 후 결과 페이지 '/search/:keyword' <SearchResultPage />
// 4. 플레이리스트 디테일 페이지(사이드바 플레이리스트 클릭시 이동) '/playlist/:id' <PlaylistDetailPage />
// 5. (모바일) 플레이리스트 보여주는 페이지 '/playlist' <LibraryPage />

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<div>검색 페이지</div>} />
        <Route path="search/:keyword" element={<div>검색 결과 페이지</div>} />
        <Route path="playlist/:id" element={<div>플레이리스트 디테일 페이지</div>} />
        {/* <Route path="playlist" element={<div>모바일 플레이리스트 페이지</div>} /> */}
      </Route>
    </Routes>
  );
}

export default App;
