// src/navigation/WorkoutsNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExercisesScreen from "../screens/ExercisesScreen";
import TrainingDaysScreen from "../screens/TrainingDaysScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import { WorkoutsStackParamList } from "./types";

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
