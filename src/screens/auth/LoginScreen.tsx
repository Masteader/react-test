import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Snackbar, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { navigate, resetNavigation } from "../../navigation/navigationRef";
import AuthStyles from "../../styles/styles";



export default function LoginScreen() {
  const { login } = useAuth();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(identity, password);
    setLoading(false);

    if (success) {
      resetNavigation("Main");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={AuthStyles.container}>
      <Text style={AuthStyles.title}>Login</Text>

      <TextInput
        label="Identity"
        mode="outlined"
        value={identity}
        onChangeText={setIdentity}
        style={AuthStyles.input}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={AuthStyles.input}
      />

      {loading ? (
        <ActivityIndicator animating={true} size="large" style={AuthStyles.loader} />
      ) : (
        <>
          <Button mode="contained" onPress={handleLogin} style={AuthStyles.button}>
            Login
          </Button>
          <Button mode="outlined" onPress={() => navigate("SignUp")} style={AuthStyles.button}>
            Sign Up
          </Button>
        </>

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



