

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import HomeScreen from "../Screens/HomeScreen/Home";
import LocationScreen from "../Screens/HomeScreen/Location/locationScreen";
import Profile from "../Screens/Profile/Profile";

const BottonTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo
                name="home"
                size={responsiveFontSize(2.5)}
                color="#008E97"
              />
            ) : (
              <AntDesign
                name="home"
                size={responsiveFontSize(2.5)}
                color="black"
              />
            ),
        }}
      />



    <Tab.Screen
        name="loaction"
        component={LocationScreen}
        options={{
          tabBarLabel: "Map",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo
                name="location-pin"
                size={responsiveFontSize(2.5)}
                color="#008E97"
              />
            ) : (
              <Entypo
                name="location-pin"
                size={responsiveFontSize(2.5)}
                color="black"
              />
            ),
        }}
      />
    
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo
                name="user"
                size={responsiveFontSize(2.5)}
                color="#008E97"
              />
            ) : (
              <Entypo
                name="user"
                size={responsiveFontSize(2.5)}
                color="black"
              />
            ),
        }}
      />

  {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarLabelStyle: { color: "#008E97" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign
              name="search1"
              size={responsiveFontSize(2.5)}
                color="#008E97"
              />
            ) : (
              <AntDesign
              name="search1"
              size={responsiveFontSize(2.5)}
                color="black"
              />
            ),
        }}
      /> */}

    </Tab.Navigator>
  );
};

export default BottonTabs;
