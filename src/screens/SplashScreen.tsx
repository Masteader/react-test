import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { navigate, resetNavigation } from '../navigation/navigationRef';
import { getAuthToken } from '../services/storage.service';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await getAuthToken();
                if (token) {
                    // Validate token here if necessary
                    resetNavigation("Main");
                } else {
                    resetNavigation('Login');
                }
            } catch (error) {
                console.error('Error checking token', error);
                navigate('Login');
            }
        };

        checkToken();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;