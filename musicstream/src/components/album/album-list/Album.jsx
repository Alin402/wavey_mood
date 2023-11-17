import "./AlbumList.css";
import "../add-album/AddAlbum.css";
import { BiSolidPhotoAlbum as PhotoIcon } from "react-icons/bi";

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
            <h2 style={{ marginTop: "1rem" }}>{album.name}</h2>
        </div>
    )
}

export default Album;