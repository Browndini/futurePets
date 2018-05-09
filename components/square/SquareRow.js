import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import _ from "lodash";
import Square from "./Square";

export default class SquareRow extends Component {
  render() {
    return (
      <View style={styles.box}>
        {_.map(["red", "green", "blue"], (color, index) => {
          return (
            <Square
              color={color}
              navigator={this.props.navigator}
              key={index}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { flex: 1, flexDirection: "row" }
});
