import axios from "axios";

const api = axios.create({
    baseURL: "https://thinkborad-backend.vercel.app/api",
})

export default api
