import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

const Splashscreen = () => {
  return (
    <Animatable.View style={Style.container}>
      <Animatable.Image
        animation="wobble"
        duraton="1500"
        source={require("../assets/Untitled.jpeg")}
      />
    </Animatable.View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default Splashscreen;
