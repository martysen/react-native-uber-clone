import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

import Intl from "intl";
import "intl/locale-data/jsonp/en-US";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: require("../assets/UberX.webp"),
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: require("../assets/UberXL.webp"),
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: require("../assets/UberLux.webp"),
  },
];

//multiplier to determine price during peak hours
const PEAK_HOUR_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  // create a local state to highlight which ride option was selected
  const [selectedRide, setSelectedRide] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedRide(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              item.id === selectedRide?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={item.image}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(
                (travelTimeInformation?.duration.value *
                  PEAK_HOUR_RATE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selectedRide}
          style={tw`bg-black py-3 m-3 ${!selectedRide && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selectedRide?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
