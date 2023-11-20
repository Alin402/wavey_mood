import "./ArtistView.css";
import "../profile/Profile.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import ProfileImage from "../profile/profile-image/ProfileImage";
import AlbumListView from "../../album/album-list/AlbumListView";
import { followArist } from "../../../actions/profile";

const ArtistView = () => {
    const location = useLocation();
    const [profileId, setProfileId] = useState("");
    const [profile, setProfile] = useState({});

    const user = useSelector((state) => state.user.user.user);

    const dispatch = useDispatch();

    useEffect(() => {
        let url = location.pathname;
        let lastIndex = url.lastIndexOf('/');
        let substring = url.substring(lastIndex + 1);
        setProfile(substring);

        const getProfile = async () => {
            try {
                const res = await api.get(`/profile/artist/one/${substring}`)
                if (res.data?.artist) {
                    setProfile(res.data.artist);
                }
            } catch (err) {
                const errors = err.response?.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                }
            }
        }

        getProfile();
    }, [])

    const handleFollowArist = () => {
        dispatch(followArist(profile._id, (profile) => {}))
    }

    return !profile ?
    <h2>loading...</h2> :
     (
        <div style={{ marginTop: "7rem" }}>
                <div
                    className="cover-photo"
                    style={{ backgroundImage: `url(${profile.coverPhotoUrl})` }}
                >
                        {
                            !profile.coverPhotoUrl &&
                            <div className="missing-cover-photo">
                                <PhotoIcon size={150} color={"#A9A9A9"} />
                            </div>
                        }
                    </div>
                    <div className="created-profile retro-style" style={{ marginTop: "2rem" }}>
                        <div className="margin-top">
                            <div 
                                className="retro-style profile-image"
                                style={{
                                    backgroundImage: `url(${profile.profilePhotoUrl})`,
                                    backgroundColor: "#d3d3d3"
                                }}
                            >
                                {
                                    !profile.profilePhotoUrl &&
                                    <div className="center">
                                        <PhotoIcon size={100} />
                                    </div>    
                                }
                            </div>
                        </div>

                        <div className="created-profile-right">
                            <div>
                                <h2 className="username-title">{profile.username}</h2>
                            </div>   
                            <div className="genres-container" style={{ marginBottom: "1rem" }}>
                                {
                                    profile.favotiteGenres?.length !== 0 && profile.genres?.map((genre, index) => {
                                        return (
                                            <div className="genre" key={index}>
                                                {genre}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {
                                !user.isArtist &&
                                <button className="btn-delete retro-style" onClick={handleFollowArist}>follow</button>
                            }
                        </div>
                    </div>
                    <div style={{ marginTop: "2rem" }}>
                        <AlbumListView profile={profile} />
                    </div>
                </div>
    )
}

export default ArtistView;