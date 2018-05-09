import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    // case actionTypes.DATA_AVAILABLE:
    //   return {
    //     ...state,
    //     ...action.data
    //   };

    case actionTypes.REMOVE_CREDITS:
      return {
        ...state,
        credits: {
          ...state.credits,
          checking: Math.abs(state.credits.checking - action.data)
        }
      };

    case actionTypes.ADD_CREDITS:
      return {
        ...state,
        credits: {
          ...state.credits,
          checking: action.data + state.credits.checking
        }
      };

    case actionTypes.DATA_AVAILABLE:
      return {
        ...action.data
      };

    default:
      return state;
  }
}
