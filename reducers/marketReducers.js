import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_MARKET:
      return {
        ...action.data
      };
    case actionTypes.BUY_ITEM_MARKET:
      return {
        ...action.data
      };
    default:
      return state;
  }
}
