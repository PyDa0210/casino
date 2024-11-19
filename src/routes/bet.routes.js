// src/routes/bet.routes.js
import express from 'express';
import { postCreateBet } from '../controllers/bet.controller.js';

const router = express.Router();

// Ruta para crear una apuesta
router.post('/create', postCreateBet);

export default router;
