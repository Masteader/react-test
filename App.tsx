import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Linking } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import BaseInjectionComponent from "./src/injection/base-injection";

export default function App() {
  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log("Deep link detected:", event.url);
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove(); // ✅ Proper cleanup of event listener
    };
  }, []);

  return (
    <SafeAreaProvider>
      <BaseInjectionComponent>
        <AppNavigator />
      </BaseInjectionComponent>
    </SafeAreaProvider>
  );
}
