import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const useWorkoutStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      elevation: 10,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    title: {
      textAlign: "center",
      marginBottom: 16,
      color: theme.colors.onBackground,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    flatListContent: {
      paddingBottom: 20,
    },
    noDataText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
    },
    surface: {
      flex: 1,
      // backgroundColor: theme.colors.surface, 
      padding: 16,
    },
    card: {
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
      borderWidth: 1,
      borderColor: theme.colors.outlineVariant,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.onSurface,
    },
  });
};

export default useWorkoutStyles;


// import { StyleSheet } from "react-native";
// import { useTheme } from "react-native-paper";

// const useWorkoutStyles = () => {
//   const theme = useTheme();

//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//       backgroundColor: theme.colors.background, // Adapts to dark/light mode
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: 16,
//       color: theme.colors.onBackground, // Adapts for readability
//     },
//     flatListContent: {
//       paddingBottom: 20,
//     },
//     noDataText: {
//       textAlign: "center",
//       marginTop: 20,
//       fontSize: 16,
//       color: theme.colors.onSurfaceVariant, // Adapts for better contrast
//     },
//     surface: {
//       padding: 16,
//       marginVertical: 8,
//       borderRadius: 12,
//       backgroundColor: theme.colors.surface, // Uses theme-based surface color
//       elevation: 4, // Subtle elevation for a modern look
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 3 },
//       shadowOpacity: 0.2,
//       shadowRadius: 4,
//     },
//     card: {
//       padding: 16,
//       marginVertical: 8,
//       borderRadius: 12,
//       backgroundColor: theme.colors.surface, // Adapts dynamically
//       shadowColor: "#000",
//       shadowOffset: { width: 0, height: 3 },
//       shadowOpacity: 0.3,
//       shadowRadius: 6,
//       elevation: 6,
//       borderWidth: 1,
//       borderColor: theme.colors.outlineVariant, // Uses theme-based border
//     },
//     name: {
//       fontSize: 18,
//       fontWeight: "bold",
//       color: theme.colors.onSurface, // Ensures proper contrast
//     },
//   });
// };

// export default useWorkoutStyles;
