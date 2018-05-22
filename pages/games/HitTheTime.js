import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import TimerMixin from "react-timer-mixin";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import MapPage from "../MapPage";
import * as Actions from "../../actions/actions";

class HitTheTime extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    comeIn: new Animated.Value(0),
    spinIn: new Animated.Value("180deg"),
    scale: new Animated.Value(0),
    displayOpacity: new Animated.Value(0),
    mixins: [TimerMixin],
    start: false,
    finalTime: "",
    disabledStop: true,
    disabledStart: false,
    display: "none",
    displayText: "",
    hit: 300 + Math.floor(Math.random() * 1000)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }

  startTime() {
    this.setState({ start: true, disabledStop: false, disabledStart: true });
  }
  stopTime(totalChecking, tt, landHere) {
    const timeToScore = Math.abs(parseInt(tt.replace(/:/g, "")) - landHere);
    let scoreToAdd = 1;
    if (timeToScore === 0) {
      scoreToAdd = 20;
    } else if (timeToScore <= 100) {
      scoreToAdd = 5;
    }
    const disText = `YOU WON ${scoreToAdd} credits!`;
    this.setState({ start: false, display: "flex", displayText: disText });
    Animated.sequence([
      Animated.timing(this.state.displayOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.parallel([
        Animated.timing(this.state.comeIn, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(this.state.spinIn, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }),
        Animated.timing(this.state.scale, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        })
      ])
    ]).start();

    this.state.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    });
    this.state.spinIn.interpolate({
      inputRange: [0, 1],
      outputRange: ["360deg", "0deg"]
    });
    this.props.addCredits(scoreToAdd);
    setTimeout(() => {
      this.props.navigator.push({
        component: MapPage,
        title: "Map Page"
      });
    }, 4000);
  }

  render() {
    const {
      fadeAnim,
      hit,
      disabledStop,
      disabledStart,
      spinIn,
      displayText,
      display,
      displayOpacity,
      comeIn,
      scale,
      spin
    } = this.state;
    let timeLast = "";
    return [
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim
          }
        ]}
      >
        <View style={[styles.top]}>
          <Text style={{ fontSize: 40 }}>Hit-A-Time</Text>
        </View>

        <View style={[{ borderColor: "#ccc" }, styles.top]}>
          <Text style={{ color: "black" }}>Stop on the time</Text>
          <Timer totalDuration={hit} msecs options={optionsTimer} />
        </View>

        <View style={styles.top}>
          <Stopwatch
            getTime={t => (timeLast = t)}
            msecs
            start={this.state.start}
            options={options}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.buttons,
              { backgroundColor: "#B3DEC1", marginBottom: 10, marginTop: 10 }
            ]}
            disabled={disabledStart}
            onPress={() => this.startTime()}
          >
            <Text>Click to Start</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3 }}>
          <TouchableOpacity
            style={[
              styles.buttons,
              { backgroundColor: "#DB3A34", marginBottom: 40, marginTop: 20 }
            ]}
            disabled={disabledStop}
            onPressIn={t => {
              this.stopTime(
                this.props.user.credits.checking,
                timeLast,
                this.state.hit
              );
            }}
          >
            <Text>STOP</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: "#493843" }]}
            onPress={() => this.props.navigator.pop()}
          >
            <Text style={{ color: "white" }}>Back</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>,
      <Animated.View
        style={[
          styles.opacityDisplay,
          {
            opacity: displayOpacity,
            display: display
          }
        ]}
      >
        <Animated.View
          style={[
            styles.spinnerStyle,
            {
              opacity: comeIn,
              transform: [{ scale: scale }]
            }
          ]}
        >
          <Text style={styles.displayPopText}>{displayText}</Text>
        </Animated.View>
      </Animated.View>
    ];
  }
}

const styles = StyleSheet.create({
  opacityDisplay: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.82)",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    zIndex: 2
  },
  spinnerStyle: {
    width: "100%",
    zIndex: 3,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 130
  },
  displayPopText: {
    fontSize: 74,
    color: "#F7E1D7",
    textAlign: "center"
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  buttons: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  images: { width: 35, height: 35 },
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
    marginTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20,
    flexDirection: "column",
    backgroundColor: "#fff",
    flexWrap: "wrap"
  }
});
const options = {
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  text: {
    fontSize: 40,
    color: "green"
  }
};
const optionsTimer = {
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  text: {
    fontSize: 16,
    color: "black"
  }
};
function mapStateToProps(state, props) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HitTheTime);
