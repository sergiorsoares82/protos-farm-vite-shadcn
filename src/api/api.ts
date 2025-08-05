// api.ts
import axios from "axios";

let accessToken: string | null = localStorage.getItem("accessToken");

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
  } else {
    localStorage.removeItem("accessToken");
  }
};

const api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true, // so refresh token cookies are sent
});

// Add Authorization header
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get new token
        const { data } = await axios.post(
          "https://localhost:3000/auth/refresh",
          {},
          { withCredentials: true }
        );

        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest); // retry request
      } catch (err) {
        console.log(err);
        setAccessToken(null);
        window.location.href = "/login"; // logout
      }
    }

    return Promise.reject(error);
  }
);

export default api;
