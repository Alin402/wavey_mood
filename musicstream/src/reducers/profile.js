import {
    CREATE_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    LOGOUT
} from "../actions/types";

const initialState = {
    profile: {},
    loading: true
};

const profile = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PROFILE:
        return { profile: payload, loading: false };
      case GET_PROFILE:
        return { profile: payload, loading: false }
      case LOGOUT:
        return { profile: {}, loading: false }
      default:
        return state;
    }
  }

export default profile;