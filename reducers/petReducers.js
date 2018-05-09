import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

export default function(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_PET:
      return action.data;
    default:
      return state;
  }
}
