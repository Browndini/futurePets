import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import * as Actions from "../actions/actions";
import TitleHeader from "./helperFunctions/TitleHeader";

class BankPage extends Component {
  render() {
    const {
      color,
      user: {
        credits: { checking, savings }
      }
    } = this.props;

    return (
      <Animated.View style={[styles.container]}>
        <TitleHeader
          title={"Bank Of Fumania"}
          callback={() => this.props.navigator.pop()}
        />
        <View style={styles.sections}>
          <View style={{ flex: 1 }}>
            <Image
              style={styles.images}
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/futurepets/icons/wallet-color.png"
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
                uri:
                  "https://s3-us-west-2.amazonaws.com/futurepets/icons/piggy-bank-color.png"
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
    flex: 5,
    fontSize: 40,
    textAlign: "center",
    position: "absolute"
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
