// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = 'https://nativeserver-phi.vercel.app';


// Create an Axios instance
const Axiosinstance = axios.create({
  baseURL: url,
});

// Add a request interceptor
Axiosinstance.interceptors.request.use(
  async (req) => {
    const accessToken = await localStorage.getItem('accessToken');
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axiosinstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      // If the error status is 401 (Unauthorized) and there is no retry flag set
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Set retry flag to true
        
        try {
          const refreshToken = await localStorage.getItem('refreshToken');

          if (!refreshToken) {
            // Handle scenario when refreshToken is not available
            // For example, clear localStorage and redirect to login
            await localStorage.clear();
            // Redirect to login page
            // window.location.href = "/doclogin";
            return Promise.reject(error);
          }

          // Request new access token using the refreshToken
          const response = await axios.post(`${url}/user/refreshtoken`, {
            refreshToken: refreshToken,
          });

          // If new access token is obtained successfully
          if (response.data?.result?.accessToken) {
            // Update localStorage with the new access token
            await localStorage.setItem("accessToken", response.data.result.accessToken);
            
            // Retry the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${response.data.result.accessToken}`;
            return axios(originalRequest);
          } else {
            // Handle scenario when new access token is not obtained
            // For example, clear localStorage and redirect to login
            await localStorage.clear();
            // Redirect to login page
            // window.location.href = "/doclogin";
            return Promise.reject(error);
          }
        } catch (error) {
          // Handle any errors occurred during token refresh
          return Promise.reject(error);
        }
      }
      // If the error status is 403 (Forbidden)
      if (error.response.status === 403 && error.response.data) {
        return Promise.reject(error.response.data);
      }
    }

    // For other types of errors, simply return the error
    return Promise.reject(error);
  }
);

// Export the Axios instance
export default Axiosinstance;
