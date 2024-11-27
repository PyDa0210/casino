import axios from 'axios';
import { RAPIDAPI_CONFIG } from '../config/rapidapi.js';

// Lista de IDs de ligas relevantes
const RELEVANT_LEAGUES = [
    1, // FIFA World Cup
    2, // Copa América
    3, // Copa Libertadores
    5, //interNacionales
    8, // Mundial femenino
    9, // Copa America
    11, 13, 14, // Copa Sudamericana
    15, //Fifa club world
    32, // clasificacion europa
    34, //clasificacion suramerica wolrd IMPORTANTE
    140, // UEFA Champions League
    78, // La Liga
    39, // Premier League
    135, // Serie A
    128, // Liga profesional Sur
    132, // Argentine Primera División
    239, 240, 241, // Colombia
    480, // olimpicos
    490, 587, // U20, u17
    524, // olimpicos femenino
    541, 540, // Conmebol
    712, //liga femenina col
    713, //superliga colombia
];

// Filtrar partidos por ligas relevantes y tipo
const filterRelevantMatches = (matches) => {
    return matches.filter((match) =>
        RELEVANT_LEAGUES.includes(match.league.id)
    );
};

// Obtener partidos en vivo
export const getLiveMatches = async () => {
    try {
        const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
            headers: RAPIDAPI_CONFIG.HEADERS,
            params: { live: 'all' },
        });
        return filterRelevantMatches(response.data.response);
    } catch (error) {
        console.error('Error al obtener partidos en vivo:', error.response?.data || error.message);
        throw new Error('Error al obtener los partidos en vivo.');
    }
};

// Obtener partidos próximos
export const getUpcomingMatches = async (date) => {
    try {
        const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
            headers: RAPIDAPI_CONFIG.HEADERS,
            params: { date, status: 'NS' },
        });
        return filterRelevantMatches(response.data.response);
    } catch (error) {
        console.error('Error al obtener partidos próximos:', error.response?.data || error.message);
        throw new Error('Error al obtener los partidos próximos.');
    }
};

// Obtener partidos históricos
export const getPastMatches = async (date) => {
    try {
        const response = await axios.get(`${RAPIDAPI_CONFIG.BASE_URL}/fixtures`, {
            headers: RAPIDAPI_CONFIG.HEADERS,
            params: { date, status: 'FT' },
        });
        return filterRelevantMatches(response.data.response);
    } catch (error) {
        console.error('Error al obtener partidos históricos:', error.response?.data || error.message);
        throw new Error('Error al obtener los partidos históricos.');
    }
};