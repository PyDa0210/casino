// src/controllers/bet.controller.js
import Bet from '../models/bet.models.js';

// Crear una nueva apuesta
export const createBet = async (req, res) => {
  const { user, matchId, league, homeTeam, awayTeam, betType, amount, odds } = req.body;

  try {
    const newBet = new Bet({
      user,
      matchId,
      league,
      homeTeam,
      awayTeam,
      betType,
      amount,
      odds,
    });

    const savedBet = await newBet.save();
    res.status(201).json(savedBet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
