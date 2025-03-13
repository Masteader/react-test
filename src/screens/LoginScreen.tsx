import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Snackbar, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import loginStyles from "../styles/styles";
import { resetNavigation } from "../navigation/navigationRef";


export default function LoginScreen() {
  const { login } = useAuth();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(identity, password, companyId);
    setLoading(false);

    if (success) {
      resetNavigation("Main");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Login</Text>

      <TextInput
        label="Identity"
        mode="outlined"
        value={identity}
        onChangeText={setIdentity}
        style={loginStyles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={loginStyles.input}
      />

      <TextInput
        label="Company ID"
        mode="outlined"
        value={companyId}
        onChangeText={setCompanyId}
        style={loginStyles.input}
      />

      {loading ? (
        <ActivityIndicator animating={true} size="large" style={loginStyles.loader} />
      ) : (
        <Button mode="contained" onPress={handleLogin} style={loginStyles.button}>
          Login
        </Button>
      )}

      <Snackbar
        visible={!!error}
        onDismiss={() => setError("")}
        action={{ label: "OK", onPress: () => setError("") }}
      >
        {error}
      </Snackbar>
    </View>
  );
}



