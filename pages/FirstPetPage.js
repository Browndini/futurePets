import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import * as Actions from "../actions/actions";

class FirstPetPage extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    mixins: [TimerMixin]
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();

    // setTimeout(() => {
    // }, 800);
  }

  render() {
    const { color } = this.props;
    const { fadeAnim } = this.state;
    const wholeColor =
      color.length === 5
        ? color + "0"
        : color.length === 4
          ? color + "00"
          : color;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("first pet 2");
          this.props.navigator.push({
            component: MapPage
          });
        }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={[styles.headerText, { flex: 0.5 }]}>YOU GOT A</Text>
          <Text style={[styles.headerText, { flex: 0.3 }]}>{wholeColor}</Text>
        </View>
        <Animated.View
          style={[
            { flex: 1, backgroundColor: `#${wholeColor}` },
            { opacity: fadeAnim }
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 40,
    textAlign: "center"
  },
  header: {
    flex: 0.3,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#F5FCFF",
    flexWrap: "wrap"
  }
});

function mapStateToProps(state, props) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPetPage);
