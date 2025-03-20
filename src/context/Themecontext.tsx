import React, { createContext, useContext, useState, useMemo } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { Colors } from "../constants/Colors";

// Function to merge themes properly
const createTheme = (isDark: boolean) => {
  return merge(isDark ? MD3DarkTheme : MD3LightTheme, {
    ...((isDark ? NavigationDarkTheme : NavigationDefaultTheme) as any),
    colors: {
      ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
      ...(isDark ? NavigationDarkTheme.colors : NavigationDefaultTheme.colors),
      ...(isDark ? Colors.dark : Colors.light), // ✅ Ensure Colors object is applied
    },
  });
};

// Create Theme Context
const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => { },
  theme: createTheme(false),
});

// Theme Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Memoized theme to avoid unnecessary re-renders
  const theme = useMemo(() => createTheme(isDarkTheme), [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

// Custom Hook for Theme Access
export const useThemeContext = () => useContext(ThemeContext);
