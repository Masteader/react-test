import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { TrainingDaysScreenNavigationProp, TrainingDaysScreenRouteProp } from "../navigation/types";
import { TrainingDay } from "../models/workout";
import { Surface, List, Text, ActivityIndicator, HelperText, Card, Button, useTheme } from "react-native-paper";
import useWorkoutStyles from "../styles/workout.styles";
import workoutService from "../services/workouts.service";

const TrainingDaysScreen: React.FC = () => {
  const navigation = useNavigation<TrainingDaysScreenNavigationProp>();
  const route = useRoute<TrainingDaysScreenRouteProp>();
  const { workoutId } = route.params;

  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const workoutStyles = useWorkoutStyles(); // Dynamically get theme-based styles
  const theme = useTheme(); // Access theme properties

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true);
        try {
          const data = await workoutService.fetchTrainingDays(workoutId);
          console.log("Fetched Training Days:", data);
          setTrainingDays(data);
          setError(null);
        } catch (err) {
          console.error("Failed to fetch training days:", err);
          setError("Failed to load training days.");
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [workoutId]) // Reload data when workoutId changes
  );

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
      ) : trainingDays.length === 0 ? (
        <Text variant="titleMedium" style={workoutStyles.noDataText}>
          No training days found.
        </Text>
      ) : (
        <FlatList
          data={trainingDays}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={workoutStyles.card}>
              <Card.Title
                title={item.name.trim() ?? "No Data"}
                left={(props) => <List.Icon {...props} icon="calendar" />}
              />
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("ExercisesScreen", { workoutId: 1, trainingDayId: item.id })}
                >
                  View Exercises
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    </Surface>
  );
};

export default TrainingDaysScreen;
