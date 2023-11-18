import "./AlbumView.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    ALBUM_ERROR
} from "../../../actions/types";
import { api } from "../../../utils/api";
import { setAlert } from "../../../actions/alert";
import Album from "../../album/album/Album";

const AlbumView = () => {
    const location = useLocation();
    const [albumId, setAlbumId] = useState("");
    const [album, setAlbum] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        let url = location.pathname;
        let lastIndex = url.lastIndexOf('/');
        let substring = url.substring(lastIndex + 1);
        setAlbumId(substring);

        const getAlbum = async () => {
            try {
                const res = await api.get(`/album/one/${substring}`)
                if (res.data?.album) {
                    setAlbum(res.data.album);
                }
            } catch (err) {
                const errors = err.response?.data.errors;

                if (errors) {
                    errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
                }

                dispatch({
                    type: ALBUM_ERROR
                });
            }
        }

        getAlbum();
    }, [])

    return (
        <div className="album-view">
            {
                !album ?
                <h2>loading...</h2> :
                <Album
                    album={album}
                />
            }
        </div>
    )
}

export default AlbumView;