// src/components/UpcomingMatches.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BetButton from './BetButton';  // Asegúrate de importar el componente del botón de apuesta

const UpcomingMatches = () => {
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Usa useNavigate correctamente

    const fetchUpcomingMatches = async () => {
        setLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            const response = await axios.get(`http://localhost:5000/api/dashboard/upcoming?date=${today}`);
            console.log('Partidos próximos:', response.data); // Verificar los partidos que recibimos
            setUpcomingMatches(response.data);
        } catch (error) {
            console.error('Error al cargar partidos próximos:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderMatchesWithBetButton = (matches) => (
        <ul>
            {matches.map((match) => (
                <li key={match.fixture.id} style={{ marginBottom: '10px' }}>
                    <h4>{match.league.name}</h4>
                    <p><strong>Fecha:</strong> {new Date(match.fixture.date).toLocaleString()}</p>
                    <p><strong>Partido:</strong> {match.teams.home.name} vs {match.teams.away.name}</p>
                    <BetButton
                        matchId={match.fixture.id}
                        league={match.league.name}
                        homeTeam={match.teams.home.name}
                        awayTeam={match.teams.away.name}
                    />
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <h3>Partidos Próximos</h3>
            <button onClick={fetchUpcomingMatches} disabled={loading}>
                {loading ? 'Cargando...' : 'Actualizar'}
            </button>
            {renderMatchesWithBetButton(upcomingMatches)}
        </div>
    );
};

export default UpcomingMatches;