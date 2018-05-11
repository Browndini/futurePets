import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import Spinner from "./Spinner";
import * as Actions from "../../actions/actions";

class Slots extends Component {
  render() {
    return (
      <View style={styles.spinners}>
        <Spinner stopper={this.props.stop} timeDifference={0} />
        <Spinner stopper={this.props.stop} timeDifference={200} />
        <Spinner stopper={this.props.stop} timeDifference={400} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinners: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#A7CCED",
    height: 120
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

export default connect(mapStateToProps, mapDispatchToProps)(Slots);
