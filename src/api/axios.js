import axios from "axios";
const instance = axios.create({
    baseURL: "https://dummyjson.com",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
})

export default instance;