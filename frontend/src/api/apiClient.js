import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000", // your backend URL
  withCredentials: true, // IMPORTANT for sending cookies!
});

// Attach access token
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors (expired access)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await apiClient.post("/accounts/refresh/");
        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Refresh failed, redirecting to login");
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
