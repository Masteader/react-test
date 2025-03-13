// src/navigation/AppNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { navigationRef } from "./navigationRef";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";

// Define Root Stack
const Stack = createStackNavigator<RootStackParamList>();

// Deep Linking Config
const linking = {
  prefixes: ["Galacticfit://", "https://Galacticfit.com"],
  config: {
    screens: {
      Main: {
        screens: {
          Home: "home",
          Workouts: {
            screens: {
              WorkoutsMain: "",
              TrainingDaysScreen: "workouts/:workoutId",
              ExercisesScreen: "workouts/:workoutId/training/:trainingDayId",
            },
          },
        },
      },
    },
  },
};

export default function AppNavigator() {
  const { token } = useAuth();

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
