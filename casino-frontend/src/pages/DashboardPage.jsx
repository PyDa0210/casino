// src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LiveMatches from '../components/LiveMatches';
import UpcomingMatches from '../components/UpcomingMatches';
import PastMatches from '../components/PastMatches';

function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div style={{ position: 'relative' }}>
            {/* Botón "Cuenta" en la parte superior derecha */}
            <div style={{ position: 'absolute', top: '50px', right: '-50px' }}>
                <button onClick={() => navigate('/account')}>Cuenta</button>
            </div>

            {/* Contenido principal */}
            <div style={{ display: 'flex', marginTop: '50px' }}>
                <div style={{ flex: 1, padding: '10px' }}>
                    <LiveMatches />
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    <UpcomingMatches />
                </div>
                <div style={{ flex: 1, padding: '10px' }}>
                    <PastMatches />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;