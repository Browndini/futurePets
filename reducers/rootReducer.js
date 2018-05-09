import { combineReducers } from "redux";
import Pets from "./petReducers";
import User from "./userReducers";
import Store from "./storeReducers";

export default combineReducers({
  user: User,
  pets: Pets,
  store: Store
});
