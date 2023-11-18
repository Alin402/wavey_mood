import {
    CREATE_ALBUM,
    GET_ALBUM,
    GET_ALBUMS,
    ALBUM_ERROR,
    UPLOAD_SONG,
    DELETE_ALBUM
} from "../actions/types";

const initialState = {
    albums: [],
    album: {},
    loading: true
};

const album = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_ALBUM:
        return { ...state, loading: false, albums: [...state.albums, payload] };
      case GET_ALBUMS:
        return { ...state, loading: false, albums: payload };
      case GET_ALBUM:
        return { ...state, loading: false, album: payload }
      case DELETE_ALBUM:
        return { ...state, loading: false, albums: state.albums.filter((album) => album.id !== payload.id) }
      default:
        return state;
    }
  }

export default album;