import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import randomColor from "randomcolor";
import FirstPetPage from "../../pages/FirstPetPage";
import * as Actions from "../../actions/actions";
const names = [
  "Yoda",
  "Jack Sparrow",
  "Captain Kirk",
  "Spock",
  "Optimus Prime",
  "Gandalf",
  "Inigo Montoya",
  "Magneto",
  "Tony Stark",
  "Bilbo Baggins",
  "Legolas",
  "Inspector Clouseau",
  "Obi Wan"
];
const images = [
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/bullbasaur.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/charmander.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/snorlax.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/psyduck.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/squirtle.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/mankey.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/pikachu.png",
  "https://s3-us-west-2.amazonaws.com/futurepets/pets/jigglypuff.png"
];
class Square extends Component {
  setColor(color) {
    return randomColor({
      luminosity: "bright",
      hue: color
    });
  }
  nextpage(next) {
    const id =
      next.passProps.color.length === 5
        ? next.passProps.color + "0"
        : next.passProps.color.length === 4
          ? next.passProps.color + "00"
          : next.passProps.color.length === 0
            ? "000"
            : next.passProps.color;

    this.props.addPet([
      {
        id,
        name: names[Math.floor(Math.random() * names.length)],
        health: 30 + Math.floor(Math.random() * 30),
        image: images[Math.floor(Math.random() * images.length)],
        strength: 30 + Math.floor(Math.random() * 10),
        defense: 100 + Math.floor(Math.random() * 30),
        rarity: "F0EBD8",
        stamina: 100 + Math.floor(Math.random() * 20),
        level: 1
      }
    ]);

    this.props.navigator.push(next);
  }
  render() {
    const { color } = this.props;
    const bgColor = this.setColor(color);
    const genColor = Math.floor(
      Math.random() *
        (
          parseInt(
            bgColor
              .substr(1)
              .toLowerCase()
              .replace(/[a-z]/g, "")
          ) * 16777215
        )
          .toString()
          .substr(1, 8)
    )
      .toString(16)
      .substr(1, 6);
    const next = {
      component: FirstPetPage,
      title: "Number Page",
      passProps: {
        num: Math.floor(Math.random() * 6) + 2,
        bgColor: bgColor,
        navigator: this.props.navigator,
        color:
          bgColor
            .substr(1)
            .toLowerCase()
            .replace(/[a-z]/g, "") === ""
            ? Math.floor(Math.random() * 16777215).toString(16)
            : genColor
      }
    };
    return (
      <TouchableOpacity
        onPressOut={() => {
          this.nextpage(next, bgColor);
        }}
        style={[styles.singleBox, { backgroundColor: bgColor }]}
      />
    );
  }
}

const styles = StyleSheet.create({
  singleBox: { flex: 1, margin: 5 }
});

function mapStateToProps(state, props) {
  return {
    ...state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Square);
