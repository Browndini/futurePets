import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";

const RADIUS = 20;

class Wall extends PureComponent {
  render() {
    const width = this.props.square[0];
    const height = this.props.square[1];
    const x = this.props.position[0] - width / 2;
    const y = this.props.position[1] - height / 2;
    return (
      <View
        style={[
          styles.finger,
          { height: height, width: width, left: x, top: y }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  finger: {
    borderColor: "#FFC914",
    borderWidth: 2,
    backgroundColor: "#2E282A",
    position: "absolute"
  }
});

export { Wall };
