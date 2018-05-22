import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions
} from "react-native";
import StoreSquare from "../components/store/StoreSquare";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import TimerMixin from "react-timer-mixin";
import * as Actions from "../actions/actions";
import TitleHeader from "./helperFunctions/TitleHeader";

class PetStorePage extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    comeInTop: new Animated.Value(Dimensions.get("window").width),
    display: "none",
    mixins: [TimerMixin],
    petName: "",
    petStats: { rarity: "fff" },
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
  popUpButton(fadeAnim, comeInTop, item, name) {
    this.setState({ petStats: item, display: "flex", petName: item.name });
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
      display,
      comeInTop,
      petName,
      petStats,
      buyButton
    } = this.state;
    return [
      <ScrollView key={0} style={styles.container}>
        <TitleHeader
          title={"Pet Store"}
          callback={() => this.props.navigator.pop()}
        />
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <View style={styles.header}>
            {_.map(this.props.store, (item, index) => {
              return (
                <StoreSquare
                  popUpButton={() => {
                    this.popUpButton(fadeAnim, comeInTop, item);
                  }}
                  key={index}
                  info={item}
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
            transform: [
              {
                translateX: comeInTop
              }
            ],
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
          <View
            style={{
              top: -80,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute"
            }}
          >
            <Text
              style={[styles.displayPopText, { color: `#${petStats.rarity}` }]}
            >
              {petName}
            </Text>
          </View>
          <View style={{ top: -85, right: 20, position: "absolute" }}>
            <Image
              resizeMode="contain"
              style={{ height: 30, width: 30 }}
              source={{
                uri: "/Users/kylebrown/futurePets/images/cancel-white.png"
              }}
            />
          </View>
          <View
            style={{
              top: 40,
              flex: 1,
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{ height: 120, width: 120 }}
                source={{
                  uri: petStats.image
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1, top: 40 }}>
            <Text style={styles.statText}>Level: {petStats.level}</Text>
            <Text style={styles.statText}>Health: {petStats.health}</Text>
            <Text style={styles.statText}>Strength: {petStats.strength}</Text>
            <Text style={styles.statText}>Stamina: {petStats.stamina}</Text>
            <Text style={styles.statText}>Defense: {petStats.defense}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#9ED0E6",
            borderRadius: 5,
            paddingBottom: 5,
            paddingTop: 5,
            marginTop: 90,
            paddingLeft: 80,
            paddingRight: 80
          }}
          onPress={() => {
            let price = petStats.price;
            if (this.props.user.credits.checking >= petStats.price) {
              this.props.addPet([petStats], this.props.pets);
              this.props.removeCredits(price);
              this.props.removePetFromStore(petStats.id, this.props.store);
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
  statText: { fontSize: 20, color: "#f7e1d7" },
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
  price: { fontSize: 16, fontWeight: "400" },
  headerText: {
    flex: 5,
    fontSize: 40,
    textAlign: "center",
    position: "absolute"
  },
  header: {
    flexWrap: "wrap",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  itemContain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDBD2",
    margin: 5,
    minWidth: 100
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

export default connect(mapStateToProps, mapDispatchToProps)(PetStorePage);
