import { getLiveMatches, getUpcomingMatches, getPastMatches } from '../services/fixtures.Service.js';

// Endpoint para partidos en vivo
export const liveMatchesController = async (req, res) => {
    try {
        const matches = await getLiveMatches();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Endpoint para partidos próximos
export const upcomingMatchesController = async (req, res) => {
    const { date } = req.query; // Fecha recibida como parámetro
    try {
        const matches = await getUpcomingMatches(date);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Endpoint para partidos históricos
export const pastMatchesController = async (req, res) => {
    const { date } = req.query; // Fecha recibida como parámetro
    try {
        const matches = await getPastMatches(date);
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};