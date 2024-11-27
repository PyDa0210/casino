import React from 'react';
import api from '../api';

const LogoutButton = ({ navigate }) => {
    const handleLogout = async () => {
        try {
            await api.post('/auth/logout', null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.response?.data?.error || error.message);
            alert('Error al intentar cerrar sesión.');
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#FF6347',
                color: '#FFF',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
            }}
        >
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;
