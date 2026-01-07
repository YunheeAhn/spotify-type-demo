import { Track } from "../../../models/playList";
import SongListItems from "./SongListItems";

interface SongListProps {
  tracks: Track[];
}

const SongsList = ({ tracks }: SongListProps) => {
  return (
    <div className="songListContainer">
      {tracks.map((track) => (
        <SongListItems
          img={track.album?.images[0]?.url}
          name={track.album?.name}
          artist={track.artists?.[0].name}
          duration={track.duration_ms}
          uri={track.uri}
        ></SongListItems>
      ))}
    </div>
  );
};

export default SongsList;
