import { storePortalAuthToken } from "./storage.service";
import apiClient from "./api.service";


class AuthenticationService {
    async login(identity: string, password: string): Promise<string | null> {
        try {
            console.log("Attempting login with:", { identity, password });

            const response = await apiClient.post("portal/authentication/sign-in", { identity, password }, {
            });

            console.log("Login Response:", response.data);

            if (response.data.isSuccess) {
                await storePortalAuthToken(response.data.accessToken);
                console.log("Login successful!", response.data.accessToken);
                return response.data.accessToken;
            } else {
                console.error("Login failed:", response.data);
                return null;
            }
        } catch (error) {
            console.error("Login Error:", error);
            return null;
        }
    }

}

// Export Singleton Instance
const authenticationService = new AuthenticationService();
export default authenticationService;
