// src/routes/football.routes.js
import express from 'express';
import { getColombianLeagueMatches} from '../controllers/football.controller.js';
//import { validateLeague } from '../middlewares/validateLeague.js';

const router = express.Router();

//los partidos de una liga
router.get('/colombia',  getColombianLeagueMatches);

export default router;