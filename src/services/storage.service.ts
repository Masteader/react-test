import AsyncStorage from "@react-native-async-storage/async-storage";

const PORTAL_AUTH_TOKEN_KEY = "portalAuthToken";
const CORE_AUTH_TOKEN = "coreAuthToken";
export const storePortalAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(PORTAL_AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing auth token:", error);
  }
};

export const getPortalAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(PORTAL_AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null;
  }
};

export const removePortalAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(PORTAL_AUTH_TOKEN_KEY);
  } catch (error) {
    console.error("Error removing auth token:", error);
  }
};


export const storeCoreAuthToken = async (token: string) => {
  await AsyncStorage.setItem(CORE_AUTH_TOKEN, token);
};

export const getCoreAuthToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(CORE_AUTH_TOKEN);
};
export const clearTokens = async () => {
  await AsyncStorage.removeItem(PORTAL_AUTH_TOKEN_KEY);
  await AsyncStorage.removeItem(CORE_AUTH_TOKEN);
};