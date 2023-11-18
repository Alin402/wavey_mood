import "./AlbumList.css";
import "../add-album/AddAlbum.css";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";
import { Link } from "react-router-dom";

const Album = ({ album }) => {
    return (
        <div className="album retro-style">
            {
                !album.coverPhotoUrl?
                <>
                    <PhotoIcon size={150} color={"#000"} />
                </> :
                <img className="album-cover" src={album.coverPhotoUrl} />
            }
            <Link to={`/album/${album._id}`} className="album-link">
                <h2 style={{ marginTop: "1rem" }}>{album.name}</h2>
            </Link>
        </div>
    )
}

export default Album;