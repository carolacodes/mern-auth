import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: true, // para enviar cookies en solicitudes CORS
})

export default instance;