// src/navigation/WorkoutsNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { WorkoutsStackParamList } from "./types";
import WorkoutScreen from "../screens/tabs/WorkoutScreens/WorkoutScreen";
import ExercisesScreen from "../screens/tabs/WorkoutScreens/ExercisesScreen";
import TrainingDaysScreen from "../screens/tabs/WorkoutScreens/TrainingDaysScreen";

const Stack = createStackNavigator<WorkoutsStackParamList>();

export default function WorkoutsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{ headerShown: true }} />
      <Stack.Screen name="TrainingDaysScreen" component={TrainingDaysScreen} />
      <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
    </Stack.Navigator>
  );
}
