import "../Songs.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllAlbums
} from "../../../actions/album";
import { IoMusicalNotes as SongIcon } from "react-icons/io5";

const SongUpload = () => {
    const dispatch = useDispatch();
    const albums = useSelector((state) => state.album.albums);
    const loadingAlbums = useSelector((state) => state.album.loading);

    const [formData, setFormData] = useState({
        name: "",
        duration: 0,
        file: null
    })

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] })
    }

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [])

    return (
        <div>
            <div className="form-group">
                <label className="form-label" htmlFor="album">album to upload song to:</label>
                <select className="form-input" id="album" name="album">
                    {
                        loadingAlbums ?
                        <h2>loading...</h2> :
                        albums?.length && albums.map((album, index) => {
                            return (
                                <option key={index} value={album.id}>{album.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="name">name of the song:</label>
                <input type="text" className="form-input" id="name" name="name"></input>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="fileUrl">
                    choose the mp3 file for your song:
                    <div className="retro-style song-upload-input">
                        <SongIcon size={30} />
                    </div>
                </label>
                <input 
                    style={{ display: "none" }} 
                    accept=".mp3" type="file" 
                    className="form-input" 
                    id="fileUrl" 
                    name="fileUrl"
                    onChange={(e) => handleFileChange(e)}
                >
                </input>
                <div style={{ width: "25rem" }}>
                    <h2>
                        {
                            formData.file &&
                            formData.file.name
                        }
                    </h2>
                </div>
            </div>
            <div className="form-group">
                <button className="btn-submit">upload</button>
            </div>
        </div>
    )
}

export default SongUpload;