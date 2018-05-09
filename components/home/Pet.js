import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import _ from "lodash";
import TimerMixin from "react-timer-mixin";
// import MapPage from "./MapPage";
import * as Actions from "../../actions/actions";

class Pet extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    mixins: [TimerMixin]
  };

  render() {
    const {
      defense,
      health,
      id,
      image,
      level,
      name,
      rarity,
      stamina,
      strength
    } = this.props.data;
    const { fadeAnim } = this.state;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          resizeMode="contain"
          style={styles.images}
          source={{
            uri: image
          }}
        />
        <Text style={styles.nameText}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  images: { height: 85, width: 85, margin: 5 }
});

function mapStateToProps(state, props) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pet);
