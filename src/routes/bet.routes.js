// src/routes/bet.routes.js
import express from 'express';
import { createBet } from '../controllers/bet.controller.js';

const router = express.Router();

// Ruta para crear una apuesta
router.post('/apuesta', createBet);

export default router;
