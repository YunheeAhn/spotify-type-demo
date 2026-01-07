import { Track } from "../../../models/playList";
import SongListItems from "./SongListItems";

interface SongListProps {
  tracks: Track[];
}

const SongsList = ({ tracks }: SongListProps) => {
  return (
    <div className="songListContainer">
      {tracks
        .filter((t) => !!t.uri)
        .map((track) => (
          <SongListItems
            key={track.id}
            img={track.album?.images?.[0]?.url}
            name={track.name}
            artist={track.artists?.[0]?.name}
            duration={track.duration_ms}
            uri={track.uri!}
          />
        ))}
    </div>
  );
};

export default SongsList;
