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
  ScrollView,
  Easing
} from "react-native";
import _ from "lodash";
// import SquareRow from "../components/square/SquareRow";
// import Pet from "../components/home/Pet";
import TimerMixin from "react-timer-mixin";
// import MapPage from "./MapPage";
import * as Actions from "../../actions/actions";

class Spinner extends Component {
  state = {
    spinnerOne: new Animated.Value(-240),
    spinnerTwo: new Animated.Value(-240),
    spinnerThree: new Animated.Value(-240),
    spinnerFour: new Animated.Value(-240),
    spinnerFive: new Animated.Value(-240),
    spinnerSix: new Animated.Value(-240),
    visOne: new Animated.Value(1),
    visTwo: new Animated.Value(1),
    visThree: new Animated.Value(1),
    visFour: new Animated.Value(1),
    visFive: new Animated.Value(1),
    visSix: new Animated.Value(1),
    mixins: [TimerMixin]
  };

  spin(spinner, visable) {
    spinner.interpolate({
      inputRange: [0, 1],
      outputRange: [-240, 120]
    });
    visable.setValue(1);
    // Animated.sequence([
    return Animated.stagger(400, [
      Animated.timing(spinner, {
        easing: Easing.linear,
        toValue: 1,
        duration: 420,
        useNativeDriver: true
      }),
      Animated.parallel([
        Animated.timing(visable, {
          easing: Easing.linear,
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        }),
        Animated.timing(spinner, {
          easing: Easing.linear,
          toValue: -240,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ]);
  }
  loopin() {
    Animated.stagger(280, [
      this.spin(this.state.spinnerOne, this.state.visOne),
      this.spin(this.state.spinnerTwo, this.state.visTwo),
      this.spin(this.state.spinnerThree, this.state.visThree),
      this.spin(this.state.spinnerFour, this.state.visFour),
      this.spin(this.state.spinnerFive, this.state.visFive),
      this.spin(this.state.spinnerSix, this.state.visSix)
    ]).start(e => {
      console.log("spin thing ", e);
      if (e.finished) {
        this.loopin();
      }
    });
  }
  componentDidMount() {
    setTimeout(() => {
      this.loopin();
    }, this.props.timeDifference);
  }

  render() {
    // const { s1, s2, s3 } = this.props.spinners;
    const {
      spinnerOne,
      spinnerTwo,
      spinnerThree,
      spinnerFour,
      spinnerFive,
      spinnerSix,
      visOne,
      visTwo,
      visThree,
      visFour,
      visFive,
      visSix
    } = this.state;

    return (
      <View
        style={{
          backgroundColor: "#D81E5B",
          flex: 1,
          marginLeft: 10,
          marginRight: 10,
          overflow: "hidden"
        }}
      >
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.imageAnimate,

            {
              opacity: visOne,
              transform: [
                {
                  translateY: spinnerOne
                }
              ]
            }
          ]}
          source={{
            uri: "/Users/kylebrown/futurePets/images/casino/moneyBag.png"
          }}
        />
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.imageAnimate,
            {
              opacity: visTwo,
              transform: [
                {
                  translateY: spinnerTwo
                }
              ]
            }
          ]}
          source={{
            uri: "/Users/kylebrown/futurePets/images/casino/bell.png"
          }}
        />
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.imageAnimate,
            {
              opacity: visThree,
              transform: [
                {
                  translateY: spinnerThree
                }
              ]
            }
          ]}
          source={{
            uri: "/Users/kylebrown/futurePets/images/casino/diamond.png"
          }}
        />
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.imageAnimate,
            {
              opacity: visFour,
              transform: [
                {
                  translateY: spinnerFour
                }
              ]
            }
          ]}
          source={{
            uri: "/Users/kylebrown/futurePets/images/casino/cherry.png"
          }}
        />
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.imageAnimate,
            {
              opacity: visFive,
              transform: [
                {
                  translateY: spinnerFive
                }
              ]
            }
          ]}
          source={{
            uri: "/Users/kylebrown/futurePets/images/casino/seven.png"
          }}
        />
        <Animated.Image
          resizeMode="contain"
          style={[
            styles.imageAnimate,
            {
              opacity: visSix,
              transform: [
                {
                  translateY: spinnerSix
                }
              ]
            }
          ]}
          source={{
            uri: "/Users/kylebrown/futurePets/images/casino/horseshoe.png"
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: { fontSize: 14, fontWeight: "800" },
  images: { height: 100, width: 100, margin: 5 },
  imageAnimate: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 120
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);
