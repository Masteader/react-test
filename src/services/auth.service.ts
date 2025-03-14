import { storeAuthToken } from "./storage.service";
import apiClient from "./api.service";


class AuthenticationService {
    async login(identity: string, password: string, companyId: string): Promise<string | null> {
        try {
            console.log("Attempting login with:", { identity, password, companyId });

            const response = await apiClient.post("/authentication/sign-in", { identity, password }, {
                headers: { "companyid": companyId },
            });

            console.log("Login Response:", response.data);

            if (response.data.isSuccess) {
                await storeAuthToken(response.data.accessToken);
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
