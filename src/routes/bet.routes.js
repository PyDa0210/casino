// src/routes/bet.routes.js
import express from 'express';
import { createBet } from '../controllers/bet.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para crear una apuesta
router.post('/apuesta', protect, createBet);

export default router;