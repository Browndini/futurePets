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

class Slots extends Component {
  state = {
    spinnerOne: new Animated.Value(-240),
    spinnerTwo: new Animated.Value(-240),
    spinnerThree: new Animated.Value(-240),
    mixins: [TimerMixin]
  };

  spin() {
    this.state.spinnerOne.interpolate({
      inputRange: [0, 1],
      outputRange: [-240, 120]
    });
    this.state.spinnerTwo.interpolate({
      inputRange: [0, 1],
      outputRange: [-240, 120]
    });
    this.state.spinnerThree.interpolate({
      inputRange: [0, 1],
      outputRange: [-240, 120]
    });
    Animated.sequence([
      Animated.stagger(300, [
        Animated.timing(this.state.spinnerOne, {
          easing: Easing.linear,
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinnerTwo, {
          easing: Easing.linear,
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinnerThree, {
          easing: Easing.linear,
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.spinnerOne, {
          easing: Easing.linear,
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinnerTwo, {
          easing: Easing.linear,
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinnerThree, {
          easing: Easing.linear,
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ]).start(e => {
      console.log("spin thing ", e);
      if (e.finished) {
        this.spin();
      }
    });
  }
  componentDidMount() {
    this.spin();
  }

  render() {
    const { s1, s2, s3 } = this.props.spinners;
    const { spinnerOne, spinnerTwo, spinnerThree } = this.state;
    console.log("state", this.state);
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "#A7CCED",
          height: 120
        }}
      >
        <View
          style={{
            backgroundColor: "#D81E5B",
            flex: 1,
            padding: 5,
            overflow: "hidden"
          }}
        >
          <Animated.Image
            resizeMode="contain"
            style={[
              styles.imageAnimate,
              {
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
        </View>

        <View
          style={{
            backgroundColor: "#D81E5B",
            flex: 1,
            padding: 5,
            overflow: "hidden"
          }}
        >
          <Animated.Image
            resizeMode="contain"
            style={[
              styles.imageAnimate,
              {
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
        </View>

        <View
          style={{
            backgroundColor: "#D81E5B",
            flex: 1,
            padding: 5,
            overflow: "hidden"
          }}
        >
          <Animated.Image
            resizeMode="contain"
            style={[
              styles.imageAnimate,
              {
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
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Slots);
