import "./AlbumList.css";
import "../add-album/AddAlbum.css";
import { useState } from "react";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdCancel as DeleteIcon } from "react-icons/md";
import AreYouSureModal from "../../generic/modal/AreYouSureModal";
import {
    deleteAlbum
} from "../../../actions/album";
import { useDispatch } from "react-redux";

const Album = ({ album, inDeleteMode, setInDeleteMode, showArtist }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const dispatch = useDispatch();

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const handleDeleteAlbum = () => {
        dispatch(deleteAlbum(album._id, () => {
            setOpenDeleteModal(false);
            setInDeleteMode(false);
        }))
    }

    return (
        <>  
            <div className="album retro-style">
                {
                    inDeleteMode &&
                    <div className="delete-icon">
                        <DeleteIcon size={40} color={"#b90e0a"} onClick={handleOpenDeleteModal} />
                    </div>
                }
               <div className="followed-artist-profile-image retro-style" style={{ backgroundImage: `url(${album.coverPhotoUrl})` }}></div>
                <div>
                    <div style={{ marginLeft: "1rem" }}>
                        <Link to={`/album/${album._id}`} className="album-link">
                            <h2 style={{ marginTop: "1rem" }}>{album.name}</h2>
                        </Link>
                    </div>
                    {
                        <p style={{ color: "#fff", marginLeft: "1rem" }}>{album.artistName}</p>
                    }
                </div>
            </div>
            <AreYouSureModal 
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                color="#ef5aa0"
                message={`Are you sure you want to delete album ${album.name}?`}
                action={handleDeleteAlbum}
            />
        </>
    )
}

export default Album;