import React from "react";

import { NavLink, Outlet } from "react-router";

import LibraryHeader from "./components/LibraryHeader";
import Library from "./components/Library";
import Navbar from "./components/Navbar";

import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const AppLayout = () => {
  return (
    <Layout>
      {/* Sidebar */}
      <Sidebar>
        <ContentsBox>
          <NavList>
            <NavItem to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={400}>
                Home
              </Typography>
            </NavItem>
            <NavItem to="/search">
              <SearchOutlinedIcon />
              <Typography variant="h2" fontWeight={400}>
                Search
              </Typography>
            </NavItem>
          </NavList>
        </ContentsBox>

        <ContentsBox height={"100%"}>
          <LibraryHeader />
          <Library />
        </ContentsBox>
      </Sidebar>

      <MobileSidebar>
        <NavList>
          <NavItem to="/">
            <HomeIcon />
            <Typography variant="h2" fontWeight={400}>
              Home
            </Typography>
          </NavItem>
          <NavItem to="/search">
            <SearchOutlinedIcon />
            <Typography variant="h2" fontWeight={400}>
              Search
            </Typography>
          </NavItem>

          <NavItem to="/playlist">
            <BookmarkIcon />
            <Typography variant="h2" fontWeight={400}>
              Your Library
            </Typography>
          </NavItem>
        </NavList>
      </MobileSidebar>

      {/* Main Content */}
      <MainContent>
        <Navbar />
        <Outlet />
      </MainContent>
    </Layout>
  );
};

export default AppLayout;

// **스타일 컴포넌트**
// 레이아웃
const Layout = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100vh",
  overflow: "hidden",
  padding: "8px",
  boxSizing: "border-box",
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));

// 사이드바
const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("md")]: {
    width: "220px",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

// 모바일 사이드바(하단)
const MobileSidebar = styled("div")(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    bottom: 0,
    zIndex: 1000,

    display: "flex",
    width: "100%",
    height: "80px",
    alignItems: "center",

    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

// 사이드바 컨텐츠 박스
const ContentsBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "20px",
  marginBottom: "8px",
  marginRight: "8px",
}));

// 내비게이션 리스트
const NavList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,

  [theme.breakpoints.down("sm")]: {
    display: " flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    height: "100%",
    padding: "0 10px",
    boxSizing: "border-box",
    margin: 0,
    listStyle: "none",
  },
}));

// 내비게이션 아이템(링크)
const NavItem = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  color: theme.palette.text.secondary,
  transition: "all .3s ease",

  position: "relative",

  "&:before": {
    content: '""',
    display: "inline-block",
    width: "0px",
    height: "2px",
    background: theme.palette.primary.main,

    position: "absolute",
    bottom: "-5px",
    left: "0",

    transition: "all .3s ease",
  },

  "&:hover::before": {
    width: "100%",
  },

  "&:hover": {
    color: theme.palette.text.primary,
  },

  "&.active": {
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },

  "& + &": {
    marginTop: "10px",
  },

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",

    width: "calc((100% - 20px) / 3)",
    textDecoration: "none",
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    textAlign: "center",

    "&.active, &.active:hover": {
      color: theme.palette.primary.main,
    },
    "&:hover": {
      color: theme.palette.primary,
    },

    "&:before": {
      display: "none",
    },
    "& + &": {
      marginTop: "0",
    },
  },
}));

// 메인 컨텐츠
const MainContent = styled("div")(({ theme }) => ({
  width: "calc(100% - 331px)",
  height: "100%",
  overflowY: "auto",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",

  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 220px)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginRight: 0,

    // 스크롤 원래대로
    overflowY: "",
  },
}));
