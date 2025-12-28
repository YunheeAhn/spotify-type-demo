import React, { Suspense, useEffect, useRef } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import LoadingSpinner from "./common/components/LoadingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";

// 리액트-타입스크립트 스포티파이 페이지 구성목록
// 0. 사이드바(플레이리스트, 메뉴)
// 1. 홈페이지(랜딩) '/' <HomePage />
// 2. 검색 페이지 '/search' <SearchPage />
// 3. 검색 후 결과 페이지 '/search/:keyword' <SearchResultPage />
// 4. 플레이리스트 디테일 페이지(사이드바 플레이리스트 클릭시 이동) '/playlist/:id' <PlaylistDetailPage />
// 5. (모바일) 플레이리스트 보여주는 페이지 '/playlist' <LibraryPage />

// 코드 스플리팅을 위한 lazy 로딩
// 장점 : 초기 로딩 속도 향상, 필요한 컴포넌트만 로드
// 단점 : 첫 로딩 시 딜레이 발생 가능성, 복잡성 증가 -> Suspense 사용 필요
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchResultPage = React.lazy(() => import("./pages/SearchPage/SearchResultPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlayListsPage/PlaylistDetailPage"));
const LibraryPage = React.lazy(() => import("./pages/PlayListsPage/LibraryPage"));

function App() {
  const ranRef = useRef(false);

  // 유저 로그인 연결
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  // 토큰 교환 훅
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      // ✅ StrictMode 2회 호출 방지
      ranRef.current = true;

      exchangeToken({ code, codeVerifier });

      // ✅ URL에서 code 제거(새로고침/재렌더 때 재시도 방지)
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      window.history.replaceState({}, "", url.toString());
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchResultPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="playlist" element={<LibraryPage />} />

          {/* 콜백 경로 */}
          <Route path="callback" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
