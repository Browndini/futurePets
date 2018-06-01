import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image
} from "react-native";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import _ from "lodash";
import Games from "../json/arcade.json";
import HitTheTime from "./games/HitTheTime";
export default class ArcadePage extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    mixins: [TimerMixin]
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }
  onPress(item) {
    if (item === "Hit-A-Time") {
      this.props.navigator.push({
        component: HitTheTime,
        title: "Map Page",
        passProps: {
          navigator: this.props.navigator
        }
      });
    }
    this.props.navigator.pop();
    // setTimeout(() => {
    // this.props.navigator.push({
    //   component: MapPage,
    //   title: "Map Page",
    //   passProps: {
    //     navigator: this.props.navigator
    //   }
    // });
    // }, 5000);
  }

  render() {
    const { fadeAnim } = this.state;
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <FlatList
          data={Games}
          renderItem={({ item }) => (
            <TouchableHighlight
              key={item.key + "TouchableHighlight"}
              onPress={() => this.onPress(item.key)}
            >
              <View
                key={item.key + "view"}
                style={{
                  height: 60,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#ccc",
                  padding: 5,
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  key={item.key + "img"}
                  style={styles.images}
                  source={{
                    uri:
                      "https://s3-us-west-2.amazonaws.com/futurepets/icons/wallet-color.png"
                  }}
                />
                <Text key={item.key + "text"} style={{ marginLeft: 10 }}>
                  {item.key}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
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
    flexDirection: "column",
    backgroundColor: "#fff",
    flexWrap: "wrap"
  }
});
