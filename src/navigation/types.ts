// src/navigation/types.ts
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// 👇 Workouts Stack
export type WorkoutsStackParamList = {
  WorkoutScreen: undefined;
  TrainingDaysScreen: { workoutId: number };
  ExercisesScreen: { workoutId: number; trainingDayId: number };
};

// 👇 Root Stack (High-Level Navigation)
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: undefined; // Main holds the bottom tabs
};

// Navigation Props for Workouts Screens
export type TrainingDaysScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "TrainingDaysScreen">;
export type TrainingDaysScreenRouteProp = RouteProp<WorkoutsStackParamList, "TrainingDaysScreen">;
export type ExercisesScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "ExercisesScreen">;
export type ExercisesScreenRouteProp = RouteProp<WorkoutsStackParamList, "ExercisesScreen">;
export type WorkoutScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "WorkoutScreen">;
