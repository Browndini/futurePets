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
// import SquareRow from "../components/square/SquareRow";
import Slots from "../components/casino/Slots";
import TimerMixin from "react-timer-mixin";
// import MapPage from "./MapPage";
import * as Actions from "../actions/actions";

class CasinoPage extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    spinnerOne: new Animated.Value(0),
    spinnerTwo: new Animated.Value(0),
    spinnerThree: new Animated.Value(0),
    mixins: [TimerMixin],
    stop: false
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }

  render() {
    const {
      color,
      user: {
        credits: { checking, savings }
      },
      pets
    } = this.props;
    // console.log(this.props);
    const { fadeAnim } = this.state;

    return (
      <Animated.View
        style={[
          styles.container
          // { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 25, left: 0 }}
          onPressOut={() => this.props.navigator.pop()}
        >
          <Image
            resizeMode="contain"
            style={{ height: 30, width: 50 }}
            source={{ uri: "/Users/kylebrown/futurePets/images/back.png" }}
          />
        </TouchableOpacity>
        <ScrollView style={{ flex: 1, marginTop: 55 }}>
          <Slots />
          <TouchableOpacity
            style={{
              flex: 1,
              marginTop: 20,
              backgroundColor: "#FF9B42",
              alignSelf: "center",
              borderRadius: 10,
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 20,
              paddingRight: 20
            }}
            onPress={() => {
              this.setState({ stop: true });
            }}
          >
            <Text style={{ fontSize: 24 }}>STOP</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: { fontSize: 14, fontWeight: "800" },
  images: { height: 100, width: 100, margin: 5 },
  singleBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDBD2",
    margin: 5,
    minWidth: 100
  },
  headerText: {
    fontSize: 40,
    textAlign: "center"
  },
  header: {
    flex: 0.3,
    marginTop: 20,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#fff",
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

export default connect(mapStateToProps, mapDispatchToProps)(CasinoPage);
