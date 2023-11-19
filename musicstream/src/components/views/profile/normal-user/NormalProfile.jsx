import { useState, useEffect } from "react";
import "../Profile.css";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import NormalProfileForm from "./NormalProfileForm";
import ImageUpload from "../image-upload/ImageUpload";
import { 
    createArtistProfile, 
    getArtistProfile, 
    createNormalUserProfile,
    getNormalUserProfile
 } from "../../../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileImage from "../profile-image/ProfileImage";
import SearchGenres from "./SearchGenres";

const NormalProfile = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile.profile);
    const loadingProfile = useSelector((state) => state.profile.loading);

    const [previewProfilePhoto, setPreviewProfilePhoto] = useState("");
    const [hasProfile, setHasProfile] = useState(false);

    useEffect(() => {
        if (user?.hasProfile) {
            dispatch(getNormalUserProfile((profile) => {}));
        }
    }, [hasProfile])

    const [formData, setFormData] = useState({
        username: "",
        profilePhotoUrl: "",
        favoriteGenres: []
    })

    const handleUsernameChange = (e) => {
        setFormData({ ...formData, username: e.target.value });
    }

    const handleProfilePhotoChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPreviewProfilePhoto(reader.result)
            console.log(reader.result)
            setFormData({ ...formData, profilePhotoUrl: reader.result })
        }
        reader.onerror = (error) => {
            console.log(error);
        }
    }

    const submitProfile = () => {
        console.log(formData)
        dispatch(createNormalUserProfile(formData, navigate, setHasProfile));
    }

    const addGenre = (genre) => {
        let genres = formData.favoriteGenres;
        if (genres.includes(genre)) {
            return;
        }
        genres = [...genres, genre];
        setFormData({ ...formData, favoriteGenres: genres });
    }

    const removeGenre = (genre) => {
        let genres = formData.favoriteGenres;
        let index = genres.indexOf(genre);

        if (index !== -1) {
            genres.splice(index, 1);
        }

        setFormData({ ...formData, favoriteGenres: genres });
    }

    return (
        <div className="artist-profile">
            {
                (user.hasProfile && !loadingProfile) || (hasProfile) ? 
                <div className="created-profile">
                    <div className="margin-top">
                        <ProfileImage 
                            imageUrl={profile.profilePhotoUrl}
                            username={profile.username}
                        />
                    </div>

                    <div className="genres-container">
                        {
                            profile.favotiteGenres?.length !== 0 && profile.favoriteGenres?.map((genre, index) => {
                                return (
                                    <div className="genre" key={index}>
                                        {genre}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> :
                (
                    <>
                        <div className="form-profile-container">
                            <div className="form-profile-forms">
                                <NormalProfileForm
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
                                <SearchGenres
                                    addGenre={addGenre}
                                    removeGenre={removeGenre}
                                    favoriteGenres={formData.favoriteGenres}
                                 />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default NormalProfile;