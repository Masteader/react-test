import apiClient from "./api.service";
import { UserDay, Workout, Workouts } from "../models/workout";
import { getCoreAuthToken, getPortalAuthToken } from "./storage.service";
import { jwtDecode } from "jwt-decode";
import { TokenDetails } from "../models/user";
import { UserExercise } from "../models/exercise";
import { useState } from "react";

class WorkoutService {

    async getTokenDetails(tokenType: string): Promise<TokenDetails | null> {
        try {
            let tokenString: string | null = null;
            if (tokenType === 'core') {
                tokenString = await getCoreAuthToken();
            } else if (tokenType === 'portal') {
                tokenString = await getPortalAuthToken();
            }
            if (!tokenString) {
                console.error(`No auth token found for tokenType: ${tokenType}`);
                return null;
            }

            const decodedData = jwtDecode<TokenDetails>(tokenString);
            const tokenDetails = new TokenDetails();
            Object.assign(tokenDetails, decodedData);



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
            const tokenDetails = await this.getTokenDetails("core");
            if (!tokenDetails) return [];

            const userId = tokenDetails.sub;
            const response = await apiClient.get(`core/Workout/get-user-workouts/${userId}`);

            return response.data.items;
        } catch (error) {
            console.error("Fetch Workouts Error:", error);
            return [];
        }
    }
    async fetchTrainingDays(workoutId: number): Promise<UserDay[]> {
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

            const response = await apiClient.get(
                `core/Day/get-user-days/${workoutId}`,
            );

            console.log("API Response for Training Days:", response.data);

            return response.data ?? [];
        } catch (error) {
            console.error("Fetch Training Days Error:", error);
            return [];
        }
    }

    async fetchExercises(trainingDayId: number): Promise<UserExercise[]> {
        try {
            const response = await apiClient.get(`core/Exercise/get-user-exercises/${trainingDayId}`);
            console.log("API Response for Exercises:", response.data);
            return response.data.items;
        } catch (error) {
            console.error("Fetch Exercises Error:", error);
            return [];
        }
    }
}

// Export Singleton Instance
const workoutService = new WorkoutService();
export default workoutService;
