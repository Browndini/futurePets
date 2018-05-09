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
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import * as Actions from "../actions/actions";

class HomePetPage extends Component {
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

    // setTimeout(() => {
    // this.props.navigator.pop();
    // push({
    //   component: MapPage,
    //   title: "Map Page",
    //   passProps: {
    //     navigator: this.props.navigator
    //   }
    // });
    // }, 5000);
  }

  render() {
    const {
      color,
      user: {
        credits: { checking, savings }
      },
      pets
    } = this.props;
    console.log(this.props);
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={{ position: "absolute", top: 25, left: 0 }}
          onPressOut={() => this.props.navigator.pop()}
        >
          <Image
            resizeMode="contain"
            style={{ height: 30, width: 50 }}
            source={{
              uri: "/Users/kylebrown/futurePets/images/back.png"
            }}
          />
        </TouchableOpacity>
        <ScrollView
          style={{
            flex: 1,
            marginTop: 70
          }}
        >
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            {_.map(pets, (pet, index) => {
              console.log("here");
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    // this.props.popUpButton();
                    console.log("clicked");
                  }}
                  style={[
                    styles.singleBox,
                    { backgroundColor: `#${pet.rarity}` }
                  ]}
                >
                  <Image
                    resizeMode="contain"
                    style={styles.images}
                    source={{
                      uri: pet.image
                    }}
                  />
                  <Text style={styles.nameText}>{pet.name}</Text>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      paddingTop: 5,
                      paddingBottom: 5
                    }}
                  >
                    <Text>Level: {pet.level}</Text>
                    <Text>Defense: {pet.defense}</Text>
                    <Text>Health: {pet.health}</Text>
                    <Text>Stamina: {pet.stamina}</Text>
                    <Text>Strength: {pet.strength}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePetPage);
