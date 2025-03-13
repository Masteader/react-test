import { View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const LoadingComponent = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={64}></ActivityIndicator>
    </View>
  );
};

export default LoadingComponent;
