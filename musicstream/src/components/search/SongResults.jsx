import "./Search.css";
import Song from "../songs/Song";
import { api } from "../../utils/api";

const SongResults = ({ results }) => {
    const getAlbum = async (id) => {
        try {
            const res = await api.get(`/album/one/${id}`)
            if (res.data?.album) {
                return res.data.album;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="search-results">
            {
                results?.length !== 0 && results?.map((song, index) => {
                    let album = getAlbum(song.albumId);
                    console.log(album)
                    return <Song key={index} song={song} album={album} />  
                })
            }
        </div>
    )
}

export default SongResults;