import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        The UI component has been left blank. Do something as self exercise
      </Text>
    </View>
  );
};

export default EatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e",
    alignItems: "center",
    justifyContent: "center",
  },
});
