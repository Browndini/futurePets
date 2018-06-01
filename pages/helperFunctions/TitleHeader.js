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
import TimerMixin from "react-timer-mixin";

import * as Actions from "../../actions/actions";

class TitleHeader extends Component {
  render() {
    const rightContent = this.props.rightContent && "No Title";
    const headerCss = this.props.headerCss && "";
    const { callback } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity style={{ flex: 0.5 }} onPressOut={() => callback()}>
          <Image
            resizeMode="contain"
            style={{ height: 30, width: 30 }}
            source={{
              uri:
                "https://s3-us-west-2.amazonaws.com/futurepets/icons/back.png"
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, headerCss]}>{this.props.title}</Text>
        <Text style={{ flex: 0.5 }}>{rightContent}</Text>
      </View>
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
    flex: 5.5,
    fontSize: 40,
    textAlign: "center",
    position: "absolute"
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleHeader);
