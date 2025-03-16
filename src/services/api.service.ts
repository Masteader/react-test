import axios, { AxiosInstance } from "axios";
import { getPortalAuthToken, getCompanyToken } from "./storage.service";

class ApiClient {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://www.galacticfit.com/api/",
      headers: { "Content-Type": "application/json" },
    });

    // Attach interceptors
    this.setupInterceptors();
  }

  private async setupInterceptors() {
    // Request Interceptor - Attach Token
    this.http.interceptors.request.use(async (config) => {
      const isCompanySelectionRequest = config.url?.includes("portal/Company/get-user-companies") ||
        config.url?.includes("portal/Authentication/get-token");

      let token = isCompanySelectionRequest ? await getPortalAuthToken() : await getCompanyToken();

      if (!token) {
        token = await getPortalAuthToken(); // Fallback to auth token if no company token is available
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // Response Interceptor - Handle Errors
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log("Unauthorized! Logging out...");
          // Implement logout or token refresh logic
        }
        return Promise.reject(error);
      }
    );
  }

  getHttpClient() {
    return this.http;
  }
}

// Export Singleton Instance
const apiClient = new ApiClient();
export default apiClient.getHttpClient();
