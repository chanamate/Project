import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
})
axiosInstance.interceptors.response.use(response => response.data.data)
export default axiosInstance