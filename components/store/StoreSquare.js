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

class StoreSquare extends Component {
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
    const { flipIn } = this.state;
    const {
      health,
      id,
      image,
      level,
      name,
      price,
      defense,
      stamina,
      rarity,
      strength
    } = this.props.info;
    let bgColor = `#${rarity}`;
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
            // this.flipInFun(flipIn);
            // this.props.popUpButton();
          }}
          style={[
            {
              backfaceVisibility: "hidden",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DEDBD2",
              minWidth: 100,
              backgroundColor: "#C2847A",
              position: "absolute",
              transform: [
                {
                  rotateY: flipIn.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: ["-180deg", "-100deg", "0deg"]
                  })
                }
              ]
            }
          ]}
        >
          <Image
            resizeMode="contain"
            style={[styles.imagesBack, { margin: 5 }]}
            source={{
              uri: image
            }}
          />
          <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
            <Text style={styles.statText}>Level: {level}</Text>
            <Text style={styles.statText}>Health: {health}</Text>
            <Text style={styles.statText}>Strength: {strength}</Text>
            <Text style={styles.statText}>Stamina: {stamina}</Text>
            <Text style={styles.statText}>Defense: {defense}</Text>
            {/* <TouchableOpacity style={{ backgroundColor: "#848586" }}>
              Buy
            </TouchableOpacity> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // this.flipInFun(flipIn);
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
              backgroundColor: bgColor,
              position: "absolute",
              transform: [
                {
                  rotateY: flipIn.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: ["0deg", "80deg", "180deg"]
                  })
                }
              ]
            }
          ]}
        >
          <Image
            resizeMode="contain"
            style={[styles.images, { margin: 5 }]}
            source={{
              uri: image
            }}
          />
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.price}>{price} Credits</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: { fontSize: 14, fontWeight: "100" },
  images: { height: 100, width: 100 },
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

export default connect(mapStateToProps, mapDispatchToProps)(StoreSquare);
