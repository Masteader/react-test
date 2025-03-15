import React from "react";
import { View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../context/Themecontext";
import useWorkoutStyles from "../styles/workout.styles";
import SignalRListener from "../core/components/SignalRListener";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isDarkTheme, toggleTheme } = useThemeContext(); // Use theme context
  const styles = useWorkoutStyles(); // Dynamically get theme-based styles
  const theme = useTheme(); // Access theme properties

  return (
    <Surface style={styles.surface}>
      <Text variant="headlineLarge">{t("welcome")}</Text>
      <Button mode="contained" onPress={toggleTheme} style={{ marginTop: 20 }}>
        {isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
      {/* <SignalRListener />  */}
    </Surface>
  );
}
