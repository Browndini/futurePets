import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import SquareRow from "../components/square/SquareRow";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import * as Actions from "../actions/actions";

export default class SquarePage extends Component {
  render() {
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
