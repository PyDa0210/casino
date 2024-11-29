// src/controllers/football.controller.js
import { getMatchesByLeague } from '../services/apiFootball.Service.js';

export const getColombianLeagueMatches = async (req, res) => {
  const leagueId = 140; // 
  const season = new Date().getFullYear(); // Año actual como temporada
  
  try {
    const matches = await getMatchesByLeague(leagueId, season);
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};