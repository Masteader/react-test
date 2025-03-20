import React, { useEffect, useState, useCallback } from "react";
import { FlatList, RefreshControl, ActivityIndicator, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Card, Button, List, Text, Surface, useTheme } from "react-native-paper";
import { useAuth } from "../../../context/AuthContext";
import { Workout, Workouts } from "../../../models/workout";
import { WorkoutsStackParamList } from "../../../navigation/types";
import workoutService from "../../../services/workouts.service";
import useWorkoutStyles from "../../../styles/workout.styles";


type WorkoutScreenNavigationProp = StackNavigationProp<WorkoutsStackParamList, "WorkoutScreen">;

export default function WorkoutScreen() {
  const [workouts, setWorkouts] = useState<Workouts[]>([]);
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
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text variant="headlineLarge" style={styles.title}>
          Workouts
        </Text>
        <Button
          mode="outlined"
          onPress={logout}
          textColor={theme.colors.error}
          style={styles.logoutButton}
          labelStyle={styles.logoutText}
        >
          Logout
        </Button>
      </View>

      {/* Loader */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }) => (
            <Card style={styles.cardContainer}>
              {/* Card Header */}
              <Card.Title
                title={item.name}
                titleStyle={styles.cardTitle}
                left={(props) => <List.Icon {...props} icon="dumbbell" color={theme.colors.primary} />}
              />
              {/* Card Actions */}
              <Card.Actions style={styles.cardActions}>
                <Button
                  mode="contained"
                  buttonColor={theme.colors.primary}
                  textColor={theme.colors.onPrimary}
                  onPress={() => navigation.navigate("TrainingDaysScreen", { workoutId: item.id })}
                  style={styles.viewButton}
                >
                  View Details
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
    </Surface>
  );
}
