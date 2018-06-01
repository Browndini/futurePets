import * as actionTypes from "./actionTypes";
import _ from "lodash";
import Data from "../json/user.json";
import { AsyncStorage } from "react-native";

// export function actionSetData() {
//   try{
//     getData();
//   }catch(err){

//   }
//   await AsyncStorage.setItem("user", JSON.stringify(Data));
//   // return getData();
// }

export function actionGetData() {
  try {
    AsyncStorage.setItem("user", JSON.stringify(Data));
  } catch (err) {
    console.log("error actsion get data");
  }
  return getData();
}

export function getData() {
  return dispatch => {
    AsyncStorage.getItem("user").then(r => {
      // console.log("get data", JSON.parse(r));
      dispatch({ type: actionTypes.DATA_AVAILABLE, data: JSON.parse(r) });
    });
  };
}

export function addPet(pet, pets = []) {
  delete pet[0].price;
  if (!_.isEmpty(pets)) {
    pet = _.concat(pet, pets);
  }
  return dispatch => {
    dispatch({ type: actionTypes.ADD_PET, data: pet });
  };
}
export function getStore() {
  return dispatch => {
    fetch(
      "https://nsig2x3c00.execute-api.us-west-2.amazonaws.com/v1/store/123456789"
    )
      .then(response => response.json())
      .then(responseJson => {
        responseJson.sort(function(a, b) {
          return a.price - b.price;
        });
        dispatch({ type: actionTypes.GET_STORE, data: responseJson });
      });
  };
}
export function getMarket() {
  return dispatch => {
    fetch(
      "https://nsig2x3c00.execute-api.us-west-2.amazonaws.com/v1/market/123456789"
    )
      .then(response => response.json())
      .then(responseJson => {
        responseJson.sort(function(a, b) {
          return a.price - b.price;
        });
        dispatch({ type: actionTypes.GET_MARKET, data: responseJson });
      });
  };
}
export function removePetFromStore(pet, store) {
  store = _.filter(store, item => item.id !== pet);
  return dispatch => {
    dispatch({ type: actionTypes.BUY_PET_STORE, data: store });
  };
}
export function removeItemFromMarket(item, store) {
  store = _.filter(store, current => current.id !== item);
  return dispatch => {
    dispatch({ type: actionTypes.BUY_ITEM_MARKET, data: store });
  };
}

export function addCredits(credits) {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_CREDITS, data: credits });
  };
}
export function removeCredits(credits) {
  return dispatch => {
    dispatch({ type: actionTypes.REMOVE_CREDITS, data: credits });
  };
}
