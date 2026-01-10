import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SimplifiedPlayList } from "../../models/playList";
import PlayListItem from "../../common/components/PlayListItem";
import { unfollowPlaylist } from "../../apis/playListApi";

async function deletePlaylistApi(playlistId: string) {
  await unfollowPlaylist(playlistId);
}

interface PlaylistProps {
  playlists: SimplifiedPlayList[];
}

// 사이드 바 플레이리스트 카드 리스트 컴포넌트
const PlayList = ({ playlists }: PlaylistProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [list, setList] = useState<SimplifiedPlayList[]>(playlists);
  const navigate = useNavigate();

  useEffect(() => {
    setList(playlists);
  }, [playlists]);

  const handleItemClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };

  const handleDelete = async (id: string) => {
    await deletePlaylistApi(id);
    setList((prev) => prev.filter((p) => p.id !== id));
    setSelectedId((prev) => (prev === id ? "" : prev));
  };

  return (
    <div>
      {list.map((item) => (
        <PlayListItem
          selected={selectedId === item.id}
          handleClick={handleItemClick}
          onDelete={handleDelete}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          key={item.id}
          artistName={"" + item.owner?.display_name}
        />
      ))}
    </div>
  );
};

export default PlayList;
