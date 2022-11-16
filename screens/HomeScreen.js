import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";

import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full pt-10`}>
      <View style={tw`p-1`}>
        <Image
          source={require("../assets/Uber-Logo.png")}
          style={styles.uberLogo}
        />

        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//   AndroidSafeArea: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
// });

const styles = StyleSheet.create({
  uberLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
