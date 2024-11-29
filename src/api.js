// src/api.js
import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Usamos la variable de entorno
  withCredentials: true, // Permite el envío de cookies (si es necesario para la autenticación)
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Token JWT del usuario autenticado
  },
});

export default api;
