import React, { useEffect, useRef, useState } from "react";
import LoginButton from "../../common/components/LoginButton";
import { Box, styled, Typography } from "@mui/material";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  return (
    <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} height={"64px"}>
      {userProfile ? (
        <UserWrapper ref={containerRef}>
          <UserContainer onClick={() => setIsOpen((prev) => !prev)}>
            <Typography>{userProfile.display_name}</Typography>

            {userProfile.images?.[0] ? (
              // 이미지가 있다면 유저 이미지
              <UserImage>
                <img src={userProfile.images[0].url} />
              </UserImage>
            ) : (
              // 이미지가 없다면 아이콘 이미지
              <UserImage>
                <PersonIcon />
              </UserImage>
            )}
          </UserContainer>

          {isOpen && (
            <LogoutMenu>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </LogoutMenu>
          )}
        </UserWrapper>
      ) : (
        <LoginButton></LoginButton>
      )}
    </Box>
  );
};

// 스타일드 컴포넌트
const UserWrapper = styled("div")(() => ({
  position: "relative",
}));

// 유저 표시 부분 컨테이너
const UserContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.active,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "30px",
  padding: "10px 12px",
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "all .3s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

// 유저 이미지 박스(유저이미지, 디폴트이미지)
const UserImage = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100%",
  width: "30px",
  height: "30px",
  overflow: "hidden",
  background: "white",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  "& svg  path": {
    color: theme.palette.primary.main,
  },
}));

// 로그아웃 메뉴
const LogoutMenu = styled("div")(() => ({
  position: "absolute",
  right: "0%",
  top: "calc(100% + 8px)",
}));

const LogoutButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.action.active,
  padding: "8px",
  boxSizing: "border-box",
  fontSize: "14px",
  borderRadius: "10px",

  cursor: "pointer",
  transition: "all .3s ease",

  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
export default Navbar;
