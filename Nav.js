import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  NavigatorIOS,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import SquarePage from "./pages/SquarePage";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FontAwesome, { Icons } from "react-native-fontawesome";
import * as Actions from "./actions/actions";

class Nav extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.removeItem("user");
    this.props.setData();
    try {
      AsyncStorage.getItem("user").then(r => {
        console.log("get storage ", r);
      });
    } catch (error) {
      // console.log("first");
      // Error saving data
    }
  }
  render() {
    return (
      <NavigatorIOS
        ref="nav"
        navigationBarHidden={true}
        initialRoute={{
          component: SquarePage,
          title: "InstaFake"
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
function mapStateToProps(state, props) {
  return {
    userName: state.user.userName,
    data: state.user.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
