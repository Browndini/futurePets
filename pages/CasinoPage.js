import React, { PureComponent } from "react";
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { GameEngine, GameLoop } from "react-native-game-engine";
import { Finger } from "../components/casino/Finger";
import { MoveFinger } from "../components/casino/MoveFinger";
import { Wall } from "../components/casino/Wall";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;
const SQUARE = 50;

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
    this.state = {
      x: WIDTH / 2 - RADIUS,
      y: HEIGHT / 2 - RADIUS,
      squareX: 230,
      squareY: 100,
      squareStart: -100
    };
  }
  // updateHandler = ({ touches, screen, time }) => {
  //   touches.find(x => console.log(x));
  //   let move = touches.find(x => x.type === "move");
  //   if (move) {
  //     this.setState({
  //       x: this.state.x + move.delta.pageX,
  //       y: this.state.y + move.delta.pageY,
  //       squareX: this.state.squareX + move.delta.pageX,
  //       squareY: this.state.squareY + move.delta.pageY
  //     });
  //   }
  // };

  render() {
    return (
      <View>
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
        <GameEngine
          style={styles.container}
          systems={[MoveFinger]}
          entities={{
            1: { position: [40, 200], renderer: <Finger /> }, //-- Notice that each entity has a unique id (required)
            2: {
              square: [this.state.squareX, this.state.squareY],
              position: [this.state.squareX, this.state.squareY],
              renderer: <Wall />
            }
          }}
          // renderer={(entities, screen) => {
          //   console.log(entities);
          //   return screen;
          // }}
        >
          <View style={styles.player} />
          <StatusBar hidden={true} />
        </GameEngine>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ababab"
  },
  player: {
    position: "absolute",
    backgroundColor: "pink",
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2
  },
  square: {
    position: "absolute",
    backgroundColor: "#17BEBB",
    width: SQUARE * 2,
    height: SQUARE * 2
  }
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
