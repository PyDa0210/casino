// src/services/bet.service.js
import Bet from '../models/bet.models.js';
import User from '../models/user.models.js';
import { validateMatchFromAPI } from './apiFootball.Service.js';

export const createBet = async ({ userId, matchId, betType, amount }) => {
  try {
    // Validar el usuario
    const user = await User.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    if (user.saldo < amount) throw new Error('Saldo insuficiente');

    // Validar el partido
    const match = await validateMatchFromAPI(matchId);
    if (!match) throw new Error('Partido no válido para apostar');

    // Calcular cuotas (puedes usar datos de la API o algo fijo por ahora)
    const odds = 1.5; // Cuota fija de ejemplo, puedes calcularla según el equipo o partido

    // Crear la apuesta
    const newBet = new Bet({
      user: userId,
      matchId,
      league: match.league.name,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
      betType,
      amount,
      odds,
    });

    await newBet.save();

    // Restar saldo del usuario
    user.saldo -= amount;
    await user.save();

    return newBet;
  } catch (error) {
    throw new Error(error.message);
  }
};
