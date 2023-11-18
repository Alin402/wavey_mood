import { api } from '../utils/api';
import { setAlert } from './alert';
import {
  CREATE_PROFILE, 
  PROFILE_ERROR,
  GET_PROFILE,
  SET_ALERT,
  USER_LOADED
} from './types';

export const createArtistProfile = (formData, navigate, setHasProfile) => async (dispatch) => {
  try {
    const res = await api.post('/profile/artist', formData);

    if (res.data?.profile) {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Profile successfully created" }
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
      setHasProfile(true);
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const getArtistProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/artist');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const createNormalUserProfile = (formData, navigate, setHasProfile) => async (dispatch) => {
  try {
    const res = await api.post('/profile/normalUser', formData);

    if (res.data?.profile) {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.profile
      });
      dispatch({
        type: SET_ALERT,
        payload: { type: "success", msg: "Profile successfully created" }
      })
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile
      })
      setHasProfile(true);
    }
  } catch (err) {
    const errors = err.response?.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};

export const getNormalUserProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/normalUser');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert({ msg: error.msg, type: 'error' })));
    }

    dispatch({
      type: PROFILE_ERROR
    });
  }
};