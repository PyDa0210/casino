// src/controllers/bet.controller.js
import Bet from '../models/bet.models.js';
import User from '../models/user.models.js';

export const createBet = async (req, res) => {
    const { matchId, league, teamId, betType, amount, homeTeam, awayTeam } = req.body;

    try {
        // Validar el usuario autenticado
        const user = req.user;
        if (!user) return res.status(401).json({ error: 'Usuario no autenticado.' });

        // Verificar saldo suficiente
        if (user.saldo < amount) {
            return res.status(400).json({ error: 'Saldo insuficiente para realizar esta apuesta.' });
        }

        // Establecer odds fijas
        const odds = {
            home: 1.8, // Odds para el equipo local
            away: 2.2, // Odds para el equipo visitante
            draw: 2.0, // Odds para empate
        }[betType];

        if (!odds) {
            return res.status(400).json({ error: 'Tipo de apuesta inválido.' });
        }

        // Crear la apuesta
        const newBet = new Bet({
            user: user._id,
            matchId,
            league,
            homeTeam,
            awayTeam,
            teamId, // Este campo será null para "draw"
            betType,
            amount,
            odds,
        });

        // Guardar la apuesta
        const savedBet = await newBet.save();

        // Restar saldo del usuario
        user.saldo -= amount;
        await user.save();

        // Enviar la respuesta con la apuesta creada
        res.status(201).json(savedBet);
    } catch (error) {
        console.error('Error al crear apuesta:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};