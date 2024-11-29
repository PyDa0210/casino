import express from 'express';
import { registerUser, loginUser, logoutUser, getAuthenticatedUser } from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
//import { validateUser, validateLogin } from '../middlewares/validateUser.js';


const router = express.Router();

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para cerrar sesión
router.post('/logout', protect, logoutUser);

// Ruta para obtener datos básicos del usuario autenticado
router.get('/me', protect, getAuthenticatedUser);

export default router;
