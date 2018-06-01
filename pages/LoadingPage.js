import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import SquareRow from "../components/square/SquareRow";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MapPage from "./MapPage";
import SquarePage from "./SquarePage";
import * as Actions from "../actions/actions";
// import * as Actions from "../actions/actions";

class LoadingPage extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    try {
      this.props.getStore();
      this.props.getMarket();
      AsyncStorage.getItem("user").then(data => {
        if (data) {
          this.props.navigator.push({
            component: MapPage,
            title: "Map Page",
            passProps: {
              navigator: this.props.navigator
            }
          });
        }
        // console.log("get data", JSON.parse(r));
      });
    } catch (error) {
      this.props.navigator.push({
        component: SquarePage,
        title: "Map Page",
        passProps: {
          navigator: this.props.navigator
        }
      });
    }
  }
  render() {
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <Image
          style={styles.images}
          source={require("../images/icons/loading.gif")}
        />
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  images: { flex: 1, width: "60%", resizeMode: Image.resizeMode.contain },
  headerText: {
    flex: 1,
    fontSize: 40,
    textAlign: "center"
  },
  header: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    alignItems: "center",
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: "column",
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
