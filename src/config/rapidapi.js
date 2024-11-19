import dotenv from 'dotenv';

dotenv.config(); 


export const RAPIDAPI_CONFIG = {
    BASE_URL: 'https://api-football-v1.p.rapidapi.com/v3',
    HEADERS: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
};