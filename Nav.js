import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  NavigatorIOS,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import LoadingPage from "./pages/LoadingPage";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FontAwesome, { Icons } from "react-native-fontawesome";
import * as Actions from "./actions/actions";

class Nav extends Component {
  constructor(props) {
    super(props);
    // AsyncStorage.removeItem("user");
    this.props.actionGetData();
  }
  render() {
    // console.log("props ", this.props);
    return (
      <NavigatorIOS
        ref="nav"
        navigationBarHidden={true}
        initialRoute={{ component: LoadingPage, title: "Main Page" }}
        style={{ flex: 1 }}
      />
    );
  }
}
function mapStateToProps(state, props) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
