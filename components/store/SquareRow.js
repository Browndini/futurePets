import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import _ from "lodash";
import StoreSquare from "./StoreSquare";

export default class SquareRow extends Component {
  render() {
    return (
      <View style={styles.box}>
        {_.map(["red", "green", "blue"], (color, index) => {
          return (
            <StoreSquare
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
  box: { flex: 1, flexDirection: "row", backgroundColor: "#fff" }
});
