// src/navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import WorkoutsNavigator from "./WorkoutsNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="workouts" component={WorkoutsNavigator} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
