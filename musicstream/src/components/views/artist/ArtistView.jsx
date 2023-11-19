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

    return !profile ?
    <h2>loading...</h2> :
     (
        <div className="created-profile">
            <div className="profile-header">
                {
                    !profile.coverPhotoUrl ?
                    (
                        <div className="missing-cover-photo retro-style" style={{ width: "100%", backgroundColor: "#d3d3d3" }}>
                            <label htmlFor="coverPhotoUrl" style={{ cursor: "pointer" }}>
                                <PhotoIcon size={150} color={"#A9A9A9"} />
                            </label>
                        </div>
                    ) :
                    <img
                        className="cover-photo-img"
                        src={profile.coverPhotoUrl}
                    />
                }
                    <div className="profile-image-container">
                        <ProfileImage 
                            imageUrl={profile.profilePhotoUrl}
                            username={profile.username}
                        />
                    </div>

                    {
                            !user?.isArtist &&
                            <button className="btn-delete">follow</button>
                        }
            </div>

            <div className="genres-container">
                {
                    profile.genres?.length !== 0 && profile.genres?.map((genre, index) => {
                        return (
                            <div className="genre" key={index}>
                                {genre}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <AlbumListView
                    profile={profile}
                />
            </div>
        </div>
    )
}

export default ArtistView;