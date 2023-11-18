import "./Album.css";
import { useEffect, useState } from "react";
import { MdLibraryMusic as AlbumIcon } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getArtistProfile } from "../../../actions/profile";
import Song from "../../songs/Song";

const Album = ({ album }) => {
    const profile = useSelector(state => state.profile?.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtistProfile());
    }, [])

    return (
        <div className="album-container">
            <div className="album-header">
                <div>
                    {
                        album.coverPhotoUrl ?
                        <img className="album-cover-picture" src={album.coverPhotoUrl} /> :
                        <div className="missing-album-picture retro-style">
                            <AlbumIcon size={100} />
                        </div>   
                    }
                </div>
                <div>
                    <h2 className="album-title">{album.name}</h2>
                    <p className="profile-artist">{profile?.username}</p>
                </div>
            </div>

            <div className="songs-container">
                {
                    album?.songs?.length !== 0 && album?.songs?.map((song, index) => {
                        return (
                            <Song
                                key={index}
                                song={song}
                                album={album}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Album;