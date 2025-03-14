// src/navigation/navigationRef.ts
import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(name: keyof RootStackParamList, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function resetNavigation(name: string) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name }],
        });
    } else {
        console.warn("Navigation is not ready yet!");
    }
}