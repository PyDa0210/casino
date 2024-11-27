// src/components/PastMatches.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PastMatches = () => {
    const [pastMatches, setPastMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPastMatches = async () => {
        setLoading(true);
        try {
            const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:5000/api/dashboard/past?date=${yesterday}`);
            setPastMatches(response.data);
        } catch (error) {
            console.error('Error al cargar partidos históricos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para calcular el resultado del partido (ganador o empate)
    const getWinnerMessage = (homeScore, awayScore, homeTeam, awayTeam) => {
        if (homeScore > awayScore) {
            return `Victoria de ${homeTeam}`;
        } else if (awayScore > homeScore) {
            return `Victoria de ${awayTeam}`;
        } else {
            return 'Empate';
        }
    };

    // Renderiza los partidos pasados con la información adicional
    const renderMatches = (matches) => (
        <ul>
            {matches.map((match) => {
                // Extraemos la información de cada partido
                const homeTeam = match.teams.home.name;
                const awayTeam = match.teams.away.name;
                const homeScore = match.goals.home;
                const awayScore = match.goals.away;
                const matchDate = new Date(match.fixture.date).toLocaleString(); // Fecha y hora del partido
                const leagueName = match.league.name;
                
                // Calculamos el mensaje del ganador
                const winnerMessage = getWinnerMessage(homeScore, awayScore, homeTeam, awayTeam);

                return (
                    <li key={match.fixture.id} style={{ marginBottom: '20px' }}>
                        <div>
                            <h4>{leagueName}</h4>
                            <p><strong>Fecha:</strong> {matchDate}</p>
                            <p><strong>Partido:</strong> {homeTeam} vs {awayTeam}</p>
                            <p><strong>Marcador Final:</strong> {homeScore} - {awayScore}</p>
                            <p><strong>Resultado:</strong> {winnerMessage}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div>
            <h3>Históricos de Partidos</h3>
            <button onClick={fetchPastMatches} disabled={loading}>
                {loading ? 'Cargando...' : 'Actualizar'}
            </button>
            {renderMatches(pastMatches)}
        </div>
    );
};

export default PastMatches;