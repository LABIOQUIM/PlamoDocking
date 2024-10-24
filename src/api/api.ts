import axios from "axios";

const api = axios.create({
    baseURL: "http://computacao.unir.br/",  
    headers: {
        //"ngrok-skip-browser-warning": "69420",
        //"Content-Type": "application/json",
    }
})

export default api;