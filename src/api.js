// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://casino-q59h.onrender.com/api', // URL del backend en Render
  withCredentials: true, // Permite el envío de cookies (si es necesario para la autenticación)
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Token JWT del usuario autenticado
  },
});

export default api;
