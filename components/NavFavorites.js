import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

// hardcoded component data
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "200 Lake Village Blvd., Auburn Hills, MI, USA",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Engineering Center, Oakland University, Rochester, MI, USA",
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
