import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import _ from "lodash";
import * as Actions from "../actions/actions";
import TitleHeader from "./helperFunctions/TitleHeader";
import MarketSquare from "../components/store/MarketSquare";

class FarmersMarket extends Component {
  render() {
    return (
      <ScrollView style={[styles.container]}>
        <TitleHeader
          title={"Farmers Market"}
          callback={() => this.props.navigator.pop()}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.storeContents}>
            {_.map(
              [
                {
                  name: "dart",
                  price: "100",
                  description: "Increases a single pet's accuracy by 5",
                  image: "/Users/kylebrown/futurePets/images/market/dart.png"
                },
                {
                  name: "ticket",
                  price: "1000",
                  description: "A ticket to the next town!",
                  image: "/Users/kylebrown/futurePets/images/market/ticket.png"
                }
              ],
              (item, index) => {
                return <MarketSquare item={item} key={index} />;
              }
            )}
          </View>
        </View>
      </ScrollView>
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
  storeContents: {
    flexWrap: "wrap",
    // marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(FarmersMarket);
