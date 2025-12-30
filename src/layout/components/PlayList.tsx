import React, { useState } from "react";
import { useNavigate } from "react-router";
import { SimplifiedPlayList } from "../../models/playList";
import PlayListItem from "../../common/components/PlayListItem";

interface PlaylistProps {
  playlists: SimplifiedPlayList[];
}

// 사이드 바 플레이리스트 카드 리스트 컴포넌트
const PlayList = ({ playlists }: PlaylistProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  const handleItemClick = (id: string) => {
    setSelectedId(id);
    navigate(`/playlist/${id}`);
  };

  return (
    <div>
      {playlists.map((item) => (
        <PlayListItem
          selected={selectedId === item.id}
          handleClick={handleItemClick}
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
