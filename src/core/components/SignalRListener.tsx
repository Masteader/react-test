import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import * as SignalR from "@microsoft/signalr";

const SIGNALR_URL = "http://192.168.0.237:8080/hubs/my-hub"; // For Android Emulator
// Use `http://192.168.X.X:8080/hubs/my-hub` for a real device

const SignalRListener: React.FC = () => {
    const [connection, setConnection] = useState<SignalR.HubConnection | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        const newConnection = new SignalR.HubConnectionBuilder()
            .withUrl(SIGNALR_URL, { transport: SignalR.HttpTransportType.WebSockets, skipNegotiation: true }) // Ensure WebSockets
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    console.log("✅ Connected to SignalR hub");

                    // Listen for messages from the backend
                    connection.on("Method", (data: string) => {
                        console.log("📩 Message received:", data);
                        setMessage(data);
                        Alert.alert("New Notification", data);
                    });
                })
                .catch((error) => console.error("❌ Connection error:", error));
        }
    }, [connection]);

    return (
        <View>
            <Text>Latest Message:</Text>
            <Text>{message || "No messages yet"}</Text>
            <Button
                title="Send Test Message"
                onPress={() => connection?.invoke("Method", "Hello from React Native")}
            />
        </View>
    );
};

export default SignalRListener;
