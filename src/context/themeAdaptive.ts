// import React, { createContext, useContext, useState } from "react";
// import {
//     MD3DarkTheme,
//     MD3LightTheme,
//     PaperProvider,
//     adaptNavigationTheme,
// } from "react-native-paper";
// import {
//     NavigationContainer,
//     DefaultTheme as NavigationDefaultTheme,
//     DarkTheme as NavigationDarkTheme,
// } from "@react-navigation/native";
// import merge from "deepmerge";
// import { Colors } from "../constants/Colors";

// // Adapt Navigation Themes
// const { LightTheme: AdaptedLightTheme, DarkTheme: AdaptedDarkTheme } = adaptNavigationTheme({
//     reactNavigationLight: NavigationDefaultTheme,
//     reactNavigationDark: NavigationDarkTheme,
// });

// // Merge Themes
// const CombinedLightTheme = merge(MD3LightTheme, {
//     ...AdaptedLightTheme,
//     colors: {
//         ...MD3LightTheme.colors,
//         ...AdaptedLightTheme.colors,
//         ...Colors.light, // Custom colors
//     },
// });

// const CombinedDarkTheme = merge(MD3DarkTheme, {
//     ...AdaptedDarkTheme,
//     colors: {
//         ...MD3DarkTheme.colors,
//         ...AdaptedDarkTheme.colors,
//         ...Colors.dark, // Custom colors
//     },
// });

// // Theme Context
// const ThemeContext = createContext({
//     isDarkTheme: false,
//     toggleTheme: () => { },
//     theme: CombinedLightTheme,
// });

// // Theme Provider Component
// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [isDarkTheme, setIsDarkTheme] = useState(false);
//     const theme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme;

//     const toggleTheme = () => setIsDarkTheme((prev) => !prev);

//     return (
//         <ThemeContext.Provider value= {{ isDarkTheme, toggleTheme, theme }
// }>
//     <PaperProvider theme={ theme }>
//         <NavigationContainer theme={ theme }> { children } </NavigationContainer>
//             </PaperProvider>
//             </ThemeContext.Provider>
//   );
// };

// // Custom Hook for Theme Access
// export const useThemeContext = () => useContext(ThemeContext);
