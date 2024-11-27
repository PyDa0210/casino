import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Configuración de Axios

function LoginPage() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reinicia los errores antes de cada intento

        try {
            // Enviar datos al backend
            const response = await api.post('/auth/login', { correo, password });
            console.log('Login exitoso:', response.data);

            // Guardar token en el localStorage
            localStorage.setItem('token', response.data.token);

            // Redirigir al dashboard
            window.location.href = '/';
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.response?.data?.error || 'Ocurrió un error inesperado');
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <button
                onClick={() => navigate('/register')} // Botón para ir a la página de registro
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
                Registro
            </button>
        </div>
    );
}

export default LoginPage;