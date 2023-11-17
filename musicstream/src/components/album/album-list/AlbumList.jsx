import "./AlbumList.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllAlbums
} from "../../../actions/album";
import Album from "./Album";

const AlbumList = () => {
    const dispatch = useDispatch();
    const albums = useSelector((state) => state.album.albums);
    const loadingAlbums = useSelector((state) => state.album.loading);

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [])

    return loadingAlbums ?
    <h2>loading...</h2>
    : (
        <div className="album-list" style={{ marginBottom: "2rem" }}>
            <h2 className="signup-title">your albums</h2>
            {
                albums.length === 0 ?
                <h2>no albums to display...</h2> :
                (
                    <div className="album-list-container">
                        {
                            albums?.map((album, index) => {
                                return (
                                    <Album 
                                        key={index}
                                        album={album}
                                    />
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default AlbumList;