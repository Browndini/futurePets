import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions/actions";

class MarketSquare extends Component {
  state = {
    flipIn: new Animated.Value(0)
  };
  flipInFun(flip) {
    Animated.timing(flip, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
  flipOutFun(flip) {
    Animated.timing(flip, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
  render() {
    const { image, name, price } = this.props.item;
    return (
      <View
        style={[
          {
            backfaceVisibility: "hidden",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minWidth: 100
          },
          { minHeight: 144 }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.popUpButton();
          }}
          style={[
            {
              backfaceVisibility: "hidden",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DEDBD2",
              minWidth: 100,
              backgroundColor: "#FF5714",
              position: "absolute"
            }
          ]}
        >
          <Image
            resizeMode="contain"
            style={[styles.images, { margin: 5 }]}
            source={{ uri: image }}
          />
          <Text>{name}</Text>
          <Text>{price} Credits</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: { fontSize: 14, fontWeight: "100" },
  images: { height: 100, width: 100 },
  itemTouch: {
    backfaceVisibility: "hidden",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDBD2",
    minWidth: 100,
    backgroundColor: "#C2847A",
    position: "absolute"
  },
  imagesBack: { height: 50, width: 50 },
  singleBox: {
    backfaceVisibility: "hidden",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDBD2",
    minWidth: 100
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketSquare);
