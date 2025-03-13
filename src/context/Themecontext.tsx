import React, { createContext, useContext, useState } from "react";
import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme, PaperProvider } from "react-native-paper";

const LightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    surface: "#FFFFFF", // Light background for cards/surfaces
    background: "#F5F5F5", // Overall app background
    primary: "#6200ea", // Purple primary color
  },
};

const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    surface: "#121212", // Dark background for cards/surfaces
    background: "#1E1E1E", // Darker background for the app
    primary: "#BB86FC", // Purple primary color in dark mode
  },
};

const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = isDarkTheme ? DarkTheme : LightTheme;

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
