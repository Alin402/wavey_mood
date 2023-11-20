import { useState, useEffect } from "react";
import "./MainView.css";
import { NavLink } from "react-router-dom";
import { api } from "../../../utils/api";

const FollowedArtist = ({ artistId }) => {
    const [artist, setArtist] = useState(null);
    useEffect(() => {
        const getArtist = async () => {
            try {
                let res = await api.get(`/profile/artist/one/${artistId}`)
                if (res.data?.artist) {
                    setArtist(res.data.artist)
                }
            } catch (error) {
                console.log(error)
                return null;
            }
        }
        getArtist();
    }, [artistId])
    return  artist && (
        <div className="followed-artist retro-style">
            <div className="followed-artist-profile-image retro-style" style={{ backgroundImage: `url(${artist.profilePhotoUrl})` }}>

            </div>
            <NavLink to={`/artist/${artist._id}`} style={{ color: "black", marginLeft: ".5rem" }}>
                <h2 className="followed-artist-title">
                    { artist.username }
                </h2>
            </NavLink>
        </div>
    )
}

export default FollowedArtist;