// src/navigation/TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkoutsNavigator from "./WorkoutsNavigator";
import CompanyScreen from "../screens/tabs/Companyscreen";
import HomeScreen from "../screens/tabs/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="workouts" component={WorkoutsNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="Companies" component={CompanyScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}
