// src/api.js
import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia el puerto si es diferente
  withCredentials: true, // Permite el envío de cookies (si es necesario para la autenticación)
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Token JWT del usuario autenticado
  },
});

export default api;