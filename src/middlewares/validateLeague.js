// Ligas permitidas
const LEAGUES = {
    spain: 140,
    england: 39,
    colombia: 69,
};

// Middleware para validar la liga solicitada
export const validateLeague = (req, res, next) => {
    const { league } = req.params;
    if (!LEAGUES[league]) {
        return res.status(400).json({
            error: `La liga '${league}' no está permitida. Escoge entre: spain, england, colombia.`,
        });
    }
    req.leagueId = LEAGUES[league];
    next();
};
