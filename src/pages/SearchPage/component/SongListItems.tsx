import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, styled } from "@mui/material";
import moment from "moment";
import { useInView } from "react-intersection-observer";
import { useGetCurrentUserProfile } from "../../../hooks/useGetCurrentUserProfile";
import useGetCurrentUserPlayList from "../../../hooks/useGetCurrentUserPlayList";
import useAddTracksToPlaylist from "../../../hooks/useAddTracksToPlaylist";
import ErrorMessage from "../../../common/components/ErrorMessage";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

const defaultImage =
  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?semt=ais_hybrid&w=740&q=80";

interface SongListItemProps {
  img: string | undefined;
  name: string | undefined;
  artist: string | undefined;
  duration: number | undefined;
  uri: string;
}

const SongListItems = ({ img, name, artist, duration, uri }: SongListItemProps) => {
  const { data: user } = useGetCurrentUserProfile();
  const {
    data: playlist,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlayList({ limit: 20, offset: 0 });

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView();
  const { mutate: addTracksToPlaylist } = useAddTracksToPlaylist();

  const showMiniPlaylist = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 2000);
      return;
    }

    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const MENU_WIDTH = 220;

    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX - MENU_WIDTH - 8,
    });
    setOpen(true);
  };

  const addSongToPlaylist = (uri: string, playlistId: string | undefined) => {
    if (playlistId) {
      addTracksToPlaylist({ playlistId, uris: [uri] });
      setShowAddAlert(true);
      setTimeout(() => setShowAddAlert(false), 2000);
    } else {
      return <ErrorMessage message="Try again later" />;
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SongItemContainer>
      {showLoginAlert && (
        <GlobalAlert>
          <Alert severity="warning">로그인을 해주세요.</Alert>
        </GlobalAlert>
      )}

      {showAddAlert && (
        <GlobalAlert>
          <Alert severity="info">플레이리스트에 노래가 추가되었습니다.</Alert>
        </GlobalAlert>
      )}

      <SongItemImg src={img ? img : defaultImage} alt={name ? `${name} 곡 이미지` : "Unknown"} />

      <SongItemInfoContainer>
        <SongItemName>{name ? name : "Unknown"}</SongItemName>
        <SongItemArtist>{artist ? artist : "Unknown"}</SongItemArtist>
      </SongItemInfoContainer>

      <AddSongBtnWrapper>
        <Button variant="outlined" onClick={showMiniPlaylist}>
          +
        </Button>
      </AddSongBtnWrapper>

      <SongItemDuration>{duration ? moment(duration).format("mm:ss") : "Unknown"}</SongItemDuration>

      {open && (
        <MiniPlaylistMenu ref={menuRef} style={{ top: position.top, left: position.left }}>
          {playlist?.pages.map((page) =>
            page.items.map((item, index) => (
              <PlaylistItem
                key={index}
                onClick={() => {
                  setOpen(false);
                  addSongToPlaylist(uri, item.id);
                }}
              >
                {item.name}
              </PlaylistItem>
            ))
          )}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </MiniPlaylistMenu>
      )}
    </SongItemContainer>
  );
};

export default SongListItems;

// 스타일드컴포넌트
const SongItemContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  gap: 20,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },

  "&:hover .addSongBtnWrapper": {
    opacity: 1,
    visibility: "visible",
  },
}));

const SongItemImg = styled("img")(() => ({
  width: 50,
  borderRadius: 4,
  objectFit: "cover",
  flexShrink: 0,
}));

const SongItemInfoContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
}));

const SongItemName = styled("div")(() => ({
  fontWeight: 700,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const SongItemArtist = styled("div")(() => ({
  fontSize: "1rem",
  color: "#999",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const AddSongBtnWrapper = styled("div")(() => ({
  opacity: 0,
  visibility: "hidden",
  transition: "opacity 0.2s ease",
}));

const SongItemDuration = styled("div")(() => ({
  width: 50,
  textAlign: "right",
  fontSize: "1rem",
  color: "#999",
  flexShrink: 0,
}));

const GlobalAlert = styled("div")(() => ({
  position: "fixed",
  top: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
}));

const MiniPlaylistMenu = styled("div")(() => ({
  position: "absolute",
  backgroundColor: "#282828",
  borderRadius: 8,
  width: 220,
  maxHeight: 240,
  overflowY: "auto",
  zIndex: 1000,
  boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
  padding: "6px 0",

  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#555",
    borderRadius: 3,
  },
}));

const PlaylistItem = styled("div")(() => ({
  padding: "10px 16px",
  fontSize: 14,
  cursor: "pointer",
  color: "white",

  "&:hover": {
    backgroundColor: "#3e3e3e",
  },
}));
