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
  Dimensions,
  TouchableOpacity
} from "react-native";
import SquareRow from "../components/square/SquareRow";
import TimerMixin from "react-timer-mixin";
import MapPage from "./MapPage";
import marketItems from "../json/market.json";
import _ from "lodash";
import * as Actions from "../actions/actions";
import TitleHeader from "./helperFunctions/TitleHeader";
import MarketSquare from "../components/store/MarketSquare";

class FarmersMarket extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    comeInTop: new Animated.Value(Dimensions.get("window").width),
    display: "none",
    mixins: [TimerMixin],
    itemName: "",
    item: {},
    buyButton: "Buy"
  };
  popUpClose(fadeAnim, comeInTop) {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(comeInTop, {
        toValue: Dimensions.get("window").width,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
    setTimeout(() => {
      this.setState({ display: "none" });
    }, 500);
  }
  popUpCloseBuy(fadeAnim, comeInTop) {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.timing(comeInTop, {
        toValue: Dimensions.get("window").width,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
    setTimeout(() => {
      this.setState({ display: "none" });
    }, 500);
  }
  popUpButton(fadeAnim, comeInTop, item) {
    this.setState({ display: "flex", itemName: item.name, item });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(comeInTop, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  }

  render() {
    const {
      fadeAnim,
      comeInTop,
      display,
      itemName,
      item,
      buyButton
    } = this.state;
    return [
      <ScrollView style={[styles.container]} key={0}>
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
            {_.map(marketItems, (item, index) => {
              return (
                <MarketSquare
                  item={item}
                  key={index}
                  popUpButton={() => {
                    this.popUpButton(fadeAnim, comeInTop, item);
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>,
      <Animated.View
        key={1}
        style={[
          styles.opacityDisplay,
          {
            transform: [{ translateX: comeInTop }],
            opacity: fadeAnim,
            display: display
          }
        ]}
      >
        <TouchableOpacity
          style={styles.spinnerStyle}
          onPress={() => {
            this.popUpClose(fadeAnim, comeInTop);
            this.setState({ buyButton: "Buy" });
          }}
        >
          <View style={styles.popUpHeaderWrap}>
            <Text style={[styles.displayPopText]}>{itemName}</Text>
          </View>
          <View style={{ top: -85, right: 20, position: "absolute" }}>
            <Image
              resizeMode="contain"
              style={{ height: 30, width: 30 }}
              source={{
                uri:
                  "https://s3-us-west-2.amazonaws.com/futurepets/icons/cancel-white.png"
              }}
            />
          </View>
          <View style={styles.popUpImageContainer}>
            <View style={styles.popUpImage}>
              <Image
                resizeMode="contain"
                style={{ height: 120, width: 120 }}
                source={{ uri: item.image }}
              />
            </View>
          </View>
          <View style={{ flex: 1, top: 40 }}>
            <Text style={styles.statText}>{item.description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButtonTouch}
          onPress={() => {
            let price = item.price;
            if (this.props.user.credits.checking >= item.price) {
              this.props.removeCredits(price);
              this.popUpCloseBuy(fadeAnim, comeInTop);
            } else {
              this.setState({ buyButton: "Not Enough Money!" });
            }
          }}
        >
          <Text style={{ fontSize: 25 }}>{buyButton}</Text>
        </TouchableOpacity>
      </Animated.View>
    ];
  }
}

const styles = StyleSheet.create({
  spinnerStyle: {
    width: "100%",
    zIndex: 3,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    top: 130
  },
  storeContents: {
    flexWrap: "wrap",
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
  displayPopText: {
    top: 20,
    position: "absolute",
    fontSize: 50,
    color: "#F7E1D7"
  },
  opacityDisplay: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.92)",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    zIndex: 2
  },
  popUpHeaderWrap: {
    top: -80,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    position: "absolute"
  },
  buyButtonTouch: {
    backgroundColor: "#9ED0E6",
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 90,
    paddingLeft: 80,
    paddingRight: 80
  },
  statText: { fontSize: 20, color: "#f7e1d7" },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#fff",
    flexWrap: "wrap"
  },
  popUpImageContainer: {
    top: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  popUpImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
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
