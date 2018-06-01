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
import Pet from "../components/home/Pet";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import * as Actions from "../actions/actions";

class HomePage extends Component {
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
              uri:
                "https://s3-us-west-2.amazonaws.com/futurepets/icons/back.png"
            }}
          />
        </TouchableOpacity>
        <ScrollView style={{ flex: 1, marginTop: 55 }}>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <View
              onPress={() => {
                // this.props.popUpButton();
              }}
              style={[
                styles.singleBox,
                {
                  backgroundColor: `#85BFC4`,
                  borderBottomLeftRadius: 15,
                  borderTopRightRadius: 15
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  width: "100%",
                  padding: 5
                }}
              >
                <Text style={{ fontSize: 24 }}>Pets</Text>
                <ScrollView
                  horizontal={true}
                  style={
                    {
                      flexDirection: "row", // justifyContent: "center",
                      alignContent: "center",
                      paddingBottom: 5
                    }
                    // alignItems: "center"
                  }
                >
                  {_.map(pets, (pet, index) => {
                    return <Pet data={pet} key={index} />;
                  })}
                </ScrollView>
              </View>
            </View>
          </View>

          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <View
              onPress={() => {
                // this.props.popUpButton();
              }}
              style={[
                styles.singleBox,
                {
                  backgroundColor: `#155359`,
                  borderBottomRightRadius: 15,
                  borderTopLeftRadius: 15
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  width: "100%",
                  padding: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    textAlign: "right",
                    color: "whitesmoke"
                  }}
                >
                  Items
                </Text>
                <ScrollView
                  horizontal={true}
                  style={
                    {
                      flexDirection: "row",
                      width: "100%", // justifyContent: "center",
                      alignContent: "center",
                      paddingBottom: 5
                    }
                    // alignItems: "center"
                  }
                >
                  {_.map(pets, (pet, index) => {
                    return <Pet data={pet} key={index} />;
                  })}
                </ScrollView>
              </View>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
