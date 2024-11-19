// src/controllers/bet.controller.js
import { createBet } from '../services/bet.service.js';

export const postCreateBet = async (req, res) => {
  try {
    const { userId, matchId, betType, amount } = req.body;
    const newBet = await createBet({ userId, matchId, betType, amount });
    res.status(201).json(newBet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};