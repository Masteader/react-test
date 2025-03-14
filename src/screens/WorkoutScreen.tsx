import React, { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl, ActivityIndicator, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Button, List, Text, Surface, useTheme } from "react-native-paper";
import useWorkoutStyles from "../styles/workout.styles";
import workoutService from "../services/workouts.service";
import { useAuth } from "../context/AuthContext"; // Import authentication context
import { Workout } from "../models/workout";
import { WorkoutsStackParamList } from "../navigation/types";

type WorkoutScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "WorkoutScreen">;

export default function WorkoutScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const navigation = useNavigation<WorkoutScreenNavigationProp>();
  const styles = useWorkoutStyles();
  const theme = useTheme();
  const { logout } = useAuth(); // Get logout function from AuthContext

  // Fetch Workouts
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await workoutService.fetchWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Pull to Refresh Handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  // Fetch
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );


  return (
    <Surface style={styles.surface}>
      <View style={styles.headerContainer}>
        <Text variant="headlineLarge" style={styles.title}>
          Workouts
        </Text>
        <Button mode="outlined" onPress={logout} textColor={theme.colors.error}>
          Logout
        </Button>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      ) : (
        <List.Section>
          <FlatList
            style={styles.flatListContent}
            data={workouts}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item }) => (
              <Surface style={styles.container}>
                <Card style={styles.card}>
                  <Card.Title
                    title={item.name}
                    titleStyle={styles.name}
                    left={(props) => <List.Icon {...props} icon="dumbbell" />}
                  />
                  <Card.Actions>
                    <Button
                      mode="contained"
                      buttonColor={theme.colors.primary}
                      textColor={theme.colors.onPrimary}
                      onPress={() => navigation.navigate("TrainingDaysScreen", { workoutId: item.id })}
                    >
                      View Details
                    </Button>
                  </Card.Actions>
                </Card>
              </Surface>
            )}
          />
        </List.Section>
      )}
    </Surface>
  );
}
