// src/navigation/types.ts
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// 👇 Workouts Stack
export type WorkoutsStackParamList = {
  Workouts: undefined;
  "Training Days": { workoutId: number };
  Exercises: { workoutId: number; trainingDayId: number };
};

// 👇 Root Stack (High-Level Navigation)
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Main: undefined; // Main holds the bottom tabs

};

// Navigation Props for Workouts Screens
export type TrainingDaysScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "Training Days">;
export type TrainingDaysScreenRouteProp = RouteProp<WorkoutsStackParamList, "Training Days">;
export type ExercisesScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "Exercises">;
export type ExercisesScreenRouteProp = RouteProp<WorkoutsStackParamList, "Exercises">;
export type WorkoutScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "Workouts">;
