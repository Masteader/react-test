import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Surface, List, Text, ActivityIndicator, HelperText, Card, useTheme } from "react-native-paper";

import { ExercisesScreenRouteProp } from "../../../navigation/types";
import workoutService from "../../../services/workouts.service";
import useWorkoutStyles from "../../../styles/workout.styles";
import { UserExercise } from "../../../models/exercise";


const ExercisesScreen: React.FC = () => {
  const route = useRoute<ExercisesScreenRouteProp>();
  const { trainingDayId } = route.params;

  const [exercises, setExercises] = useState<UserExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const workoutStyles = useWorkoutStyles(); // Dynamically get theme-based styles
  const theme = useTheme(); // Access theme properties

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await workoutService.fetchExercises(trainingDayId);
        console.log("Fetched Exercises:", data);
        setExercises(data);
      } catch (err) {
        console.error("Failed to fetch exercises:", err);
        setError("Failed to load exercises.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [trainingDayId]);

  if (loading) {
    return (
      <Surface style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
        <ActivityIndicator animating={true} size="large" />
      </Surface>
    );
  }

  return (
    <Surface style={workoutStyles.surface}>
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : exercises.length === 0 ? (
        <Text variant="titleMedium" style={workoutStyles.noDataText}>
          No exercises found.
        </Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={workoutStyles.cardContainer}>
              <Card.Title
                title={item.id}
                left={(props) => <List.Icon {...props} icon="dumbbell" />}
              />
              <Card.Content>
                <Text variant="bodyMedium">
                  Weight: {item.exercise.name}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </Surface>
  );
};

export default ExercisesScreen;
