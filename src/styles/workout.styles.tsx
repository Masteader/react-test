import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const useWorkoutStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    surface: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      paddingVertical: 12,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.colors.onBackground,
    },
    logoutButton: {
      borderColor: theme.colors.error,
      borderWidth: 1.5,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    logoutText: {
      fontSize: 14,
      fontWeight: "bold",
    },
    loader: {
      marginTop: 20,
    },
    flatListContainer: {
      paddingBottom: 20,
    },
    cardContainer: {
      marginBottom: 12,
      borderRadius: 12,
      overflow: "hidden",
      shadowColor: theme.colors.shadow,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 6,
      elevation: 4,
    },
    card: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 10,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
    cardActions: {
      justifyContent: "flex-end",
      paddingRight: 10,
    },
    viewButton: {
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 8,
    },
    noDataText: {
      fontSize: 16,
      color: theme.colors.background,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 10,
      padding: 10,
      backgroundColor: theme.colors.onBackground,
      borderRadius: 5,
    },
  });
};

export default useWorkoutStyles;