import apiClient from "./api.service";
import { Workout } from "../models/workout";

class WorkoutService {
    async fetchWorkouts(): Promise<Workout[]> {
        try {
            const response = await apiClient.get("/Workout/getAll");
            return response.data.map((w: any) => new Workout(w.id, w.name));
        } catch (error) {
            console.error("Fetch Workouts Error:", error);
            return [];
        }
    }

    async fetchTrainingDays(workoutId: number) {
        try {
            const response = await apiClient.get(`/TrainingDay/${workoutId}`);
            console.log("API Response for Training Days:", response.data);
            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            console.error("Fetch Training Days Error:", error);
            return [];
        }
    }

    async fetchExercises(trainingDayId: number) {
        try {
            const response = await apiClient.get(`/Exercise/${trainingDayId}`);
            console.log("API Response for Exercises:", response.data);
            return Array.isArray(response.data) ? response.data : [response.data];
        } catch (error) {
            console.error("Fetch Exercises Error:", error);
            return [];
        }
    }
}

// Export Singleton Instance
const workoutService = new WorkoutService();
export default workoutService;
