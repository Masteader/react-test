// // src/context/WorkoutsContext.tsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { fetchExercises, fetchTrainingDays, fetchWorkouts } from "../services/api.service";
// import { Exercise, TrainingDay, Workout } from "../models/workout";


// const WorkoutContext = createContext<{
//   workouts: Workout[];
//   loadWorkouts: () => Promise<void>;
//   loadTrainingDays: (workoutId: number) => Promise<TrainingDay[]>;
//   loadExercises: (trainingDayId: number) => Promise<Exercise[]>;
// } | undefined>(undefined);

// export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [workouts, setWorkouts] = useState<Workout[]>([]);

//   useEffect(() => {
//     loadWorkouts();
//   }, []);

//   const loadWorkouts = async () => {
//     try {
//       const data = await fetchWorkouts();
//       setWorkouts(data.map((w: any) => new Workout(w.id, w.name)));
//     } catch (error) {
//       console.error("Failed to fetch workouts:", error);
//     }
//   };

//   const loadTrainingDays = async (workoutId: number) => {
//     try {
//       const data = await fetchTrainingDays(workoutId);
//       return data.map((td: any) => new TrainingDay(td.id, td.name));
//     } catch (error) {
//       console.error("Failed to fetch training days:", error);
//       return [];
//     }
//   };

//   const loadExercises = async (trainingDayId: number) => {
//     try {
//       const data = await fetchExercises(trainingDayId);
//       return data.map((ex: any) => new Exercise(ex.id, ex.name, ex.weight ?? 0, ex.type ?? "Unknown"));
//     } catch (error) {
//       console.error("Failed to fetch exercises:", error);
//       return [];
//     }
//   };

//   return (
//     <WorkoutContext.Provider value={{ workouts, loadWorkouts, loadTrainingDays, loadExercises }}>
//       {children}
//     </WorkoutContext.Provider>
//   );
// };

// export const useWorkouts = () => {
//   const context = useContext(WorkoutContext);
//   if (!context) throw new Error("useWorkouts must be used within a WorkoutProvider");
//   return context;
// };