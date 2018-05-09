import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";

export default class FarmersMarketPage extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    mixins: [TimerMixin]
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start();

    setTimeout(() => {
      this.props.navigator.push({
        component: MapPage,
        title: "Map Page",
        passProps: {
          navigator: this.props.navigator
        }
      });
    }, 5000);
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { flex: 0.5 }]}>YOU GOT A</Text>
          <Text style={[styles.headerText, { flex: 0.3 }]}>{wholeColor}</Text>
        </View>
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: `#${wholeColor}`
            },
            {
              opacity: fadeAnim
            }
          ]}
        />
      </View>
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
