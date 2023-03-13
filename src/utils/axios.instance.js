import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://20.2.233.46/api",
    baseURL: "http://localhost:3000/api",

})
axiosInstance.interceptors.response.use(response => response.data.data)
export default axiosInstance