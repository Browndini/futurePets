import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as Actions from "../actions/actions";

import TimerMixin from "react-timer-mixin";
import BankPage from "./BankPage";
import ArcadePage from "./ArcadePage";
import HomePage from "./HomePage";
import PetStorePage from "./PetStorePage";
import CasinoPage from "./CasinoPage";
import VideoStorePage from "./VideoStorePage";
import FarmersMarketPage from "./FarmersMarketPage";

class MapPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  nextPage(page) {
    switch (page) {
      case "bank":
        this.props.navigator.push({
          component: BankPage,
          title: `${page} Page`,
          passProps: {
            color: "ccc",
            navigator: this.props.navigator
          }
        });
        break;
      case "arcade":
        this.props.navigator.push({
          component: ArcadePage,
          title: `${page} Page`,
          passProps: {
            color: "26547C",
            navigator: this.props.navigator
          }
        });
        break;
      case "pet_store":
        this.props.navigator.push({
          component: PetStorePage,
          title: `${page} Page`,
          passProps: {
            color: "493843",
            navigator: this.props.navigator
          }
        });
        break;
      case "casino":
        this.props.navigator.push({
          component: CasinoPage,
          title: `${page} Page`,
          passProps: {
            color: "FFD166",
            navigator: this.props.navigator
          }
        });
        break;
      case "video_store":
        this.props.navigator.push({
          component: VideoStorePage,
          title: `${page} Page`,
          passProps: {
            color: "EABDA8",
            navigator: this.props.navigator
          }
        });
        break;
      case "farmers_market":
        this.props.navigator.push({
          component: FarmersMarketPage,
          title: `${page} Page`,
          passProps: {
            color: "A0B2A6",
            navigator: this.props.navigator
          }
        });
        break;
      default:
        this.props.navigator.push({
          component: HomePage,
          title: "Home Page",
          passProps: {
            color: "000",
            navigator: this.props.navigator
          }
        });
        break;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("bank");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#ED254E" }]}>
              <Text>bank</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("bank");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#ED254E" }]}>
              <Text>bank</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("bank");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#ED254E" }]}>
              <Text>bank</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("arcade");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#F9DF74" }]}>
              <Text>Arcade</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("arcade");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#F9DF74" }]}>
              <Text>Arcade</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.topRow}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("bank");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#ED254E" }]}>
              <Text>bank</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("bank");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#ED254E" }]}>
              <Text>bank</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("bank");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#ED254E" }]}>
              <Text>bank</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("pet_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#57737A" }]}>
              <Text>Pet Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("arcade");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#F9DF74" }]}>
              <Text>Arcade</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.topRow}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("pet_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#57737A" }]}>
              <Text>Pet Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("pet_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#57737A" }]}>
              <Text>Pet Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("pet_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#57737A" }]}>
              <Text>Pet Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("pet_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#57737A" }]}>
              <Text>Pet Store</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.topRow}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("casino");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#B7FFD8" }]}>
              <Text>Casino</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("casino");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#B7FFD8" }]}>
              <Text>Casino</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.topRow}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("farmers_market");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#DABECA" }]}>
              <Text>Farmers Market</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("casino");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#B7FFD8" }]}>
              <Text>Casino</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("casino");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#B7FFD8" }]}>
              <Text>Casino</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("casino");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#B7FFD8" }]}>
              <Text>Casino</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.topRow}>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("video_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#D4F4DD" }]}>
              <Text>Video Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("video_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#D4F4DD" }]}>
              <Text>Video Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("video_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#D4F4DD" }]}>
              <Text>Video Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("casino");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#B7FFD8" }]}>
              <Text>Casino</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("home");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#4B1D3F" }]}>
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("home");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#4B1D3F" }]}>
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.topRow}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("video_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#D4F4DD" }]}>
              <Text>Video Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("video_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#D4F4DD" }]}>
              <Text>Video Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("video_store");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#D4F4DD" }]}>
              <Text>Video Store</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <View style={[{ flex: 1, backgroundColor: "#fff" }]} />
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("home");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#4B1D3F" }]}>
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("home");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#4B1D3F" }]}>
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.nextPage("home");
            }}
          >
            <View style={[{ flex: 1, backgroundColor: "#4B1D3F" }]}>
              <Text>Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topRow: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    marginTop: 25,
    flexDirection: "column",
    backgroundColor: "#F5FCFF",
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

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
