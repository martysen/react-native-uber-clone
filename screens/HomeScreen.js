import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";

import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GOOGLE_MAPS_API_KEY } from "@env";

import { useDispatch } from "react-redux";

import { setOrigin, setDestination } from "../slices/navSlice";

const HomeScreen = () => {
  // declare the dispacther to push data into the data store
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full pt-10`}>
      <View style={tw`p-1`}>
        <Image
          source={require("../assets/Uber-Logo.png")}
          style={styles.uberLogo}
        />

        <GooglePlacesAutocomplete
          placeholder="Enter Start Location"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          // including the places search api
          nearbyPlacesAPI="GooglePlacesSearch"
          // google will show suggestion after user has stopped typing and waits 400ms
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          //   Query Google to search and give suggestion to user
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            // console.log(data);
            // console.log(details);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
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
