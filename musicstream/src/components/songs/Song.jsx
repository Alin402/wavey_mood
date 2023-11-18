import "./Songs.css";
import { FaCirclePlay as PlayIcon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
    addSOngInQueue,
    setCurrentSong,
    setQueue
} from "../../actions/songQueue";

const Song = ({ song, album }) => {
    const dispatch = useDispatch();
    const songs = useSelector((state) => state.songQueue.songs)

    const handlePlaySong = () => {
        dispatch(setCurrentSong(song));
        dispatch(setQueue(album.songs));
    }

    return (
        <div className="song retro-style">
            <h2 className="song-title">
                { song.name }
            </h2>
            <PlayIcon size={50} className="play-icon" onClick={handlePlaySong} />
        </div>
    )
}

export default Song;