import "./Songs.css";
import { useState, useEffect } from "react";
import { FaCirclePlay as PlayIcon } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
    addSOngInQueue,
    setCurrentSong,
    setQueue
} from "../../actions/songQueue";
import { api } from "../../utils/api";
import { NavLink } from "react-router-dom";
import { SiAudiomack as PlayingIcon } from "react-icons/si";

const Song = ({ song }) => {
    const dispatch = useDispatch();
    const [album, setAlbum] = useState({});
    const currentSong = useSelector((state) => state.songQueue.currentSong);

    useEffect(() => {
        const getAlbum = async () => {
            let res = await api.get(`/album/one/${song.albumId}`)
            if (res.data?.album) {
                setAlbum(res.data.album);
            }
        }
        getAlbum();
    }, [song])

    const handlePlaySong = () => {
        dispatch(setCurrentSong(song));
        dispatch(setQueue(album.songs));
    }

    return  album && (
        <div className="song retro-style">
            <div className="photo-and-name">
                <div className="followed-artist-profile-image retro-style" style={{ backgroundImage: `url(${album.coverPhotoUrl})` }}></div>
                <div style={{ marginLeft: "1rem" }}>
                    <h2 className="song-title">
                        { song.name }
                    </h2>
                    <NavLink to={`/album/${album._id}`} style={{ color: "#fff" }}>
                        <h3>
                            { album.name }
                        </h3>
                    </NavLink>
                </div>
            </div>
            {
                currentSong?._id === song?._id ?
                <PlayingIcon color="#ef5aa0" size={50} className="play-icon" /> :
                <PlayIcon color="#ef5aa0" size={50} className="play-icon" onClick={handlePlaySong} />
            }
        </div>
    )
}

export default Song;