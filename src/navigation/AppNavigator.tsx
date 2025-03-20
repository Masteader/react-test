// src/navigation/AppNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigationRef";
import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";
import SplashScreen from "../screens/SplashScreen";
import { useThemeContext } from "../context/Themecontext";
import SignUpScreen from "../screens/auth/SignUpScreen";
import LoginScreen from "../screens/auth/LoginScreen";

// Define Root Stack
const Stack = createStackNavigator<RootStackParamList>();
// Deep Linking Config
const linking = {
  prefixes: ["Galacticfit://", "https://Galacticfit.com"],
  config: {
    screens: {
      Splash: "splash",
      Login: "login",
      SignUp: "SignUp",
      Main: "Main",
      Home: "Home",
      Workouts: {
        screens: {
          WorkoutsMain: "workouts",
          TrainingDaysScreen: "workouts/:workoutId",
          ExercisesScreen: "workouts/:workoutId/training/:trainingDayId",
        },
      },
      Companies: "companies",
    },
  },
};

// // Deep Linking Config
// const linking = {
//   prefixes: ["Galacticfit://", "https://Galacticfit.com"],
//   config: {
//     screens: {
//       Login: "login",
//       Main: {
//         screens: {
//           Home: "home",
//           Workouts: {
//             screens: {
//               WorkoutsMain: "",
//               TrainingDaysScreen: "workouts/:workoutId",
//               ExercisesScreen: "workouts/:workoutId/training/:trainingDayId",
//             },
//           },
//         },
//       },
//     },
//   },
// };

export default function AppNavigator() {
  const { theme } = useThemeContext();
  // const theme = isDarkTheme ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer ref={navigationRef} linking={linking} >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.onPrimary,
          headerTitleStyle: { fontWeight: "bold" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
