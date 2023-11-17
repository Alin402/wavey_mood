import { combineReducers } from "redux";
import user from "./user";
import alert from "./alert";
import profile from "./profile";
import album from "./album";

export default combineReducers({
  user,
  alert,
  profile,
  album
})