import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import SquareRow from "../components/square/SquareRow";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MapPage from "./MapPage";
import LoadingPage from "./LoadingPage";
import * as Actions from "../actions/actions";
// import * as Actions from "../actions/actions";

class SquarePage extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    // try {
    //   AsyncStorage.getItem("user").then(data => {
    //     console.log("ppppp", this.props);
    //     console.log("sssss", this.state);
    //     if (data) {
    //       this.props.navigator.push({
    //         component: LoadingPage,
    //         title: "Map Page",
    //         passProps: {
    //           navigator: this.props.navigator
    //         }
    //       });
    //     }
    //     // console.log("get data", JSON.parse(r));
    //   });
    // } catch (error) {
    //   console.log("errorr");
    //   // Error saving data
    // }
  }
  render() {
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Pick A Color</Text>
        </View>
        <SquareRow navigator={this.props.navigator} />
        <SquareRow navigator={this.props.navigator} />
        <SquareRow navigator={this.props.navigator} />
        <SquareRow navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(SquarePage);
