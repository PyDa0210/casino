import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
//import { validateUser, validateLogin } from '../middlewares/validateUser.js';


const router = express.Router();

// Ruta para registrar usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

export default router;
