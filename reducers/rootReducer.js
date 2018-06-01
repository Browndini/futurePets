import { combineReducers } from "redux";
import Pets from "./petReducers";
import User from "./userReducers";
import Store from "./storeReducers";
import Market from "./marketReducers";

export default combineReducers({
  user: User,
  pets: Pets,
  market: Market,
  store: Store
});
