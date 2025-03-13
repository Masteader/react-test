import axios, { AxiosInstance } from "axios";
import { getAuthToken } from "./storage.service";

class ApiClient {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://www.galacticfit.com/api/core",
      timeout: 5000,
      headers: { "Content-Type": "application/json" },
    });

    // Attach interceptors
    this.setupInterceptors();
  }

  private async setupInterceptors() {
    // Request Interceptor - Attach Token
    this.http.interceptors.request.use(async (config) => {
      const token = await getAuthToken();
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
