import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
const authStyle = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme.colors.primary,
    },
    input: {
      marginBottom: 12,
    },
    button: {
      marginTop: 10,
      paddingVertical: 5,
    },
    loader: {
      marginTop: 10,
    },
  });
}
export default authStyle;