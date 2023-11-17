import { useState, useEffect } from "react";
import "../Profile.css";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import ArtistProfileForm from "./ArtistProfileForm";
import ArtistProfileGenres from "./ArtistProfileGenres";
import ImageUpload from "../image-upload/ImageUpload";
import { createArtistProfile, getArtistProfile } from "../../../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../profile-image/ProfileImage";
import {
    loadUser
} from "../../../../actions/user";
import AlbumList from "../../../album/album-list/AlbumList";

const ArtistProfile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile.profile);
    const loadingProfile = useSelector((state) => state.profile.loading);

    const [previewProfilePhoto, setPreviewProfilePhoto] = useState("");
    const [previewCoverPhoto, setPreviewCoverPhoto] = useState("");
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        if (user?.hasProfile) {
            dispatch(getArtistProfile());
        }
    }, [hasProfile])

    const [formData, setFormData] = useState({
        username: "",
        profilePhotoUrl: "",
        coverPhotoUrl: "",
        genres: []
    })

    const addGenre = (genre) => {
        let genres = formData.genres;
        if (genres.includes(genre)) {
            return;
        }
        genres = [...genres, genre];
        setFormData({ ...formData, genres });
    }

    const removeGenre = (genre) => {
        let genres = formData.genres;
        let index = genres.indexOf(genre);

        if (index !== -1) {
            genres.splice(index, 1);
        }

        setFormData({ ...formData, genres });
    }

    const handleUsernameChange = (e) => {
        setFormData({ ...formData, username: e.target.value });
    }

    const handleProfilePhotoChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewProfilePhoto(reader.result);
            setFormData({ ...formData, profilePhotoUrl: reader.result })
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const handleCoverPhotoChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewCoverPhoto(reader.result);
            setFormData({ ...formData, coverPhotoUrl: reader.result })
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const submitProfile = () => {
        console.log(formData)
        dispatch(createArtistProfile(formData, navigate, setHasProfile));
    }

    return (
        <div className="artist-profile">
            {
                (user.hasProfile && !loadingProfile) || (hasProfile) ? 
                <div className="created-profile">
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
                    {<h2>Followers: {profile.noFollowers}</h2>}
                    <div className="margin-top">
                        <ProfileImage 
                            imageUrl={profile.profilePhotoUrl}
                            username={profile.username}
                        />
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
                    <div style={{ marginTop: "2rem", width: "100%" }}>
                        <AlbumList />
                    </div>
                </div> :
                (
                    <>
                        <div className="cover-photo">
                            {
                                !previewCoverPhoto ?
                                    <div className="missing-cover-photo">
                                        <label htmlFor="coverPhotoUrl" style={{ cursor: "pointer" }}>
                                            <PhotoIcon size={150} color={"#A9A9A9"} />
                                            <h2>Please select a cover photo</h2>
                                        </label>
                                        <input 
                                            accept="image/*"
                                            style={{ display: "none" }} 
                                            type="file" 
                                            name="coverPhotoUrl" 
                                            id="coverPhotoUrl"
                                            onChange={(e) => handleCoverPhotoChange(e)}
                                        />
                                    </div> :
                                    <img
                                        className="cover-photo-img"
                                        src={previewCoverPhoto}
                                    />
                            }
                        </div>
                        <div className="form-profile-container">
                            <div className="form-profile-forms">
                                <ArtistProfileForm
                                    username={formData.username}
                                    handleUsernameChange={handleUsernameChange}
                                />
                            </div>
                            <div>
                                <div className="submit-div">
                                    <div className="form-group">
                                        <label htmlFor="profilePhotoUrl" style={{ cursor: "pointer" }}>
                                            <ImageUpload
                                                image={previewProfilePhoto}
                                            />
                                            <p className="form-label">choose a profile picture</p>
                                        </label>
                                        <input 
                                            accept="image/*"
                                            style={{ display: "none" }} 
                                            type="file" 
                                            name="profilePhotoUrl" 
                                            id="profilePhotoUrl"
                                            onChange={(e) => handleProfilePhotoChange(e)}
                                        />
                                    </div>
                                </div>

                                <div className="retro-style submit-profile" onClick={submitProfile}>
                                    <h2>submit profile</h2>
                                </div>
                            </div>
                            <div className="form-profile-forms">
                                <ArtistProfileGenres
                                    genres={formData.genres}
                                    addGenre={addGenre}
                                    removeGenre={removeGenre}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ArtistProfile;