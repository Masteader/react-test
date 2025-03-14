import apiClient from "./api.service";
import { Workout } from "../models/workout";
import { getAuthToken } from "./storage.service";
import { jwtDecode } from "jwt-decode";
import { TokenDetails } from "../models/user";

class WorkoutService {
    private async getTokenDetails(): Promise<TokenDetails | null> {
        try {
            const tokenString = await getAuthToken();
            if (!tokenString) {
                console.error("No auth token found!");
                return null;
            }

            console.log("Decoding token:", tokenString);

            const decodedData = jwtDecode<TokenDetails>(tokenString);
            const tokenDetails = new TokenDetails(decodedData);

            console.log("Decoded tokenDetails:", tokenDetails);
            console.log("Decoded userId:", tokenDetails.sub);

            if (!tokenDetails.sub) {
                console.error("Invalid token: No userId found.");
                return null;
            }

            return tokenDetails;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    async fetchWorkouts(): Promise<Workout[]> {
        try {
            const tokenDetails = await this.getTokenDetails();
            if (!tokenDetails) return [];

            const userId = tokenDetails.sub;
            const response = await apiClient.get(`Workout/GetUserWorkouts/${userId}`);

            return response.data.items.map((w: any) => new Workout(w.id, w.name));
        } catch (error) {
            console.error("Fetch Workouts Error:", error);
            return [];
        }
    }
    async fetchTrainingDays(workoutId: number) {
        try {
            const requestBody = {
                searchText: "",
                property: "",
                pagingParam: {
                    pageSize: 10,
                    currentPage: 1
                },
                sortingParam: {
                    sortBy: "Id",
                    sortOrder: 2
                }
            };

            const response = await apiClient.post(
                `/TrainingDay/SearchWorkoutTrainingDays/${workoutId}`,  // ✅ Correct endpoint
                requestBody,  // ✅ Send the required payload
            );

            console.log("API Response for Training Days:", response.data);

            return Array.isArray(response.data.items) ? response.data.items : [response.data.items];
        } catch (error) {
            console.error("Fetch Training Days Error:", error);
            return [];
        }
    }

    // async fetchTrainingDays(workoutId: number) {
    //     try {
    //         const response = await apiClient.post(`/TrainingDay/SearchWorkoutTrainingDays/${workoutId}`);
    //         console.log("API Response for Training Days:", response.data);
    //         return Array.isArray(response.data) ? response.data : [response.data];
    //     } catch (error) {
    //         console.error("Fetch Training Days Error:", error);
    //         return [];
    //     }
    // }

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
