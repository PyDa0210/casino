import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';
import api from '../api';

const AccountPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No estás autenticado.');
                }

                // Verificar si el token es válido llamando al endpoint de autenticación
                await api.get('/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (err) {
                setError('No estás autenticado. Por favor, inicia sesión.');
            }
        };

        checkAuth();
    }, []);

    if (error) {
        return (
            <div>
                <p style={{ color: 'red' }}>{error}</p>
                <button
                    onClick={() => navigate('/login')}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Ir a Login
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Mi Cuenta</h1>
            <UserInfo />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                    onClick={() => navigate('/betsHistory')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Mis Apuestas
                </button>
                <button
                    onClick={() => navigate('/adminBalance')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Administrar Saldo
                </button>
            </div>
            <LogoutButton navigate={navigate} />
        </div>
    );
};

export default AccountPage;