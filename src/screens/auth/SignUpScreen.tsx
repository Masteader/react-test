import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Snackbar, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import { resetNavigation } from "../../navigation/navigationRef";
import AuthStyles from "../../styles/styles";



export default function SignUpScreen() {
    const { SignUp } = useAuth();
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        const success = await SignUp(identity, password);
        setLoading(false);

        if (success) {
            resetNavigation("Login");
        } else {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <View style={AuthStyles.container}>
            <Text style={AuthStyles.title}>Signup</Text>

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
                <Button mode="contained" onPress={handleSignup} style={AuthStyles.button}>
                    SignUp
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



