import React from "react";
import type { Episode, PlaylistTrack, Track } from "../../../models/playList";
import PlayListItem from "../../../common/components/PlayListItem";

interface MobilePlayListItemProps {
  index: number;
  item: PlaylistTrack;
  // 필요하면 부모에서 선택/클릭 로직 넘겨도 됨
  selectedId?: string | null;
  handleClick?: (id: string) => void;
}

const MobilePlayListItem = ({
  item,
  index,
  selectedId = null,
  handleClick,
}: MobilePlayListItemProps) => {
  // PlaylistTrack 타입 좁히기
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  const track = item.track;

  const name = track?.name || "No Name";

  const artistName = track
    ? isEpisode(track)
      ? "N/A"
      : track.album?.name ?? "UNKNOWN"
    : "UNKNOWN";

  const image = track
    ? isEpisode(track)
      ? track.images?.[0]?.url ?? null
      : track.album?.images?.[0]?.url ?? null
    : null;

  const id = track?.id ?? `${index}`;

  const onClick = (clickedId: string) => {
    if (handleClick) return handleClick(clickedId);
    console.log("clicked track id:", clickedId);
  };

  return (
    <PlayListItem
      image={image}
      name={name}
      artistName={artistName}
      id={id}
      handleClick={onClick}
      selected={selectedId === id}
    />
  );
};

export default MobilePlayListItem;
