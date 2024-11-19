// src/controllers/football.controller.js
import { getMatchesByLeague } from '../services/apiFootball.Service.js';

export const getLeagueMatches = async (req, res) => {
  try {
      const matches = await getMatchesByLeague(req.leagueId);
      res.json(matches);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
