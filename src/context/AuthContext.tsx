import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authenticationService from "../services/auth.service";
import { resetNavigation } from "../navigation/navigationRef";
import { removePortalAuthToken } from "../services/storage.service";

interface AuthContextType {
  token: string | null;
  login: (identity: string, password: string) => Promise<boolean>;
  SignUp: (identity: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Load token from AsyncStorage on app startup
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("authToken");
      if (savedToken) {
        setToken(savedToken);
      }
    };
    loadToken();
  }, []);

  const login = async (identity: string, password: string): Promise<boolean> => {
    try {
      const authToken = await authenticationService.login(identity, password);
      if (authToken) {
        setToken(authToken);
        return true;
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    return false;
  };
  const SignUp = async (identity: string, password: string): Promise<boolean> => {
    try {
      await authenticationService.SignUp(identity, password);
      return true;

    } catch (error) {
      console.error("Signup failed", error);
    }
    return false;
  };
  const logout = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              removePortalAuthToken(); //  Clear token from AsyncStorage
              setToken(null);
              setTimeout(() => {
                resetNavigation("Login");
              }, 100);
            } catch (error) {
              console.error("Error clearing token from storage:", error);
            }
          },
        },
      ]
    );
  };


  return <AuthContext.Provider value={{ token, login, logout, SignUp }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
