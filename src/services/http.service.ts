// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Create Axios instance
// const httpService = axios.create({
//   baseURL: "https://your-api.com",
//   timeout: 5000,
//   headers: { "Content-Type": "application/json" },
// });

// // Request Interceptor (e.g., Add Auth Token)
// httpService.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor (e.g., Handle Errors)
// httpService.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized! Logging out...");
//       // Handle logout, redirect, or token refresh logic
//     }
//     return Promise.reject(error);
//   }
// );

// export default httpService;
