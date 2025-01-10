import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,  
    headers: {
        //"ngrok-skip-browser-warning": "69420",
        //"Content-Type": "application/json",
    }
})

export default api;