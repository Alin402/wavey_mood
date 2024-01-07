import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import profile from "./profile";
import album from "./album";
import songQueue from "./songQueue";
import playlist from "./playlist";

export default combineReducers({
  user,
  alert,
  profile,
  album,
  songQueue,
  playlist
})