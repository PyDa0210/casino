import React from 'react';
import api from '../api';
import { FaSignOutAlt } from 'react-icons/fa';

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
                backgroundColor: '#FF4B4B',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s, transform 0.2s',
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = '#FF6F6F';
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = '#FF4B4B';
            }}
            onMouseDown={(e) => {
                e.target.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
                e.target.style.transform = 'scale(1)';
            }}
        >
            <FaSignOutAlt size={20} />
            Cerrar Sesión
        </button>
    );
};

export default LogoutButton;
