import api from '../utils/api';
import { setAlert } from './alert';
import {
    ALBUM_ERROR,
  CREATE_ALBUM,
  SET_ALERT,
  GET_ALBUMS
} from './types';

export const createAlbum = (formData, navigate, setOpenModal) => async (dispatch) => {
  try {
    const res = await api.post('/album', formData);

    if (res.data?.album) {
      dispatch({
        type: CREATE_ALBUM,
        payload: res.data.album
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Album successfully created" }
      })
      setOpenModal(false);
      navigate("/profile")
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
};

export const getAllAlbums = () => async (dispatch) => {
  try {
    const res = await api.get('/album/all');

    dispatch({
      type: GET_ALBUMS,
      payload: res.data.albums
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: ALBUM_ERROR
    });
  }
};