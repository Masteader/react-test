// src/navigation/WorkoutsNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { WorkoutsStackParamList } from "./types";
import WorkoutScreen from "../screens/tabs/WorkoutScreens/WorkoutScreen";
import ExercisesScreen from "../screens/tabs/WorkoutScreens/ExercisesScreen";
import TrainingDaysScreen from "../screens/tabs/WorkoutScreens/TrainingDaysScreen";
import { useThemeContext } from "../context/Themecontext";

const Stack = createStackNavigator<WorkoutsStackParamList>();

export default function WorkoutsNavigator() {
  const { theme } = useThemeContext();
  return (

    <Stack.Navigator screenOptions={{ headerShown: true, headerStyle: { backgroundColor: theme.colors.primary }, headerTintColor: theme.colors.onPrimary, headerTitleStyle: { fontWeight: "bold", color: theme.colors.onPrimary }, }}>
      <Stack.Screen name="Workouts" component={WorkoutScreen} />
      <Stack.Screen name="Training Days" component={TrainingDaysScreen} />
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
    </Stack.Navigator>
  );
}
