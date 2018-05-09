import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Animated, StyleSheet, Text, View, Image } from "react-native";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import * as Actions from "../actions/actions";

class BankPage extends Component {
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
      this.props.navigator.pop();
      // push({
      //   component: MapPage,
      //   title: "Map Page",
      //   passProps: {
      //     navigator: this.props.navigator
      //   }
      // });
    }, 5000);
  }

  render() {
    const {
      color,
      user: {
        credits: { checking, savings }
      }
    } = this.props;
    const { fadeAnim } = this.state;

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bank Of Fumania</Text>
        </View>

        <View style={styles.sections}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.images}
              source={{
                uri: "/Users/kylebrown/futurePets/images/wallet-color.png"
              }}
            />
          </View>
          <View style={styles.mainText}>
            <Text>2567 * Checking Account</Text>
            <Text>{checking} credits</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.images}
              source={{
                uri: "/Users/kylebrown/futurePets/images/piggy-bank-color.png"
              }}
            />
          </View>
          <View style={styles.mainText}>
            <Text>1423 * Savings Account</Text>
            <Text>{savings} credits</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  images: { width: 35, height: 35 },
  mainText: {
    flex: 7,
    flexDirection: "column",
    alignContent: "center"
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
  sections: {
    marginTop: 20,
    padding: 5,
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    borderColor: "#CBBFBB",
    borderRadius: 5,
    borderWidth: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(BankPage);
