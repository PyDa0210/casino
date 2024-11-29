import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Configuración de Axios

const useRecargaSaldo = () => {
    const [monto, setMonto] = useState('');
    const [metodo, setMetodo] = useState('');
    const [tipo, setTipo] = useState('recarga'); // Aquí manejamos el tipo de la transacción
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeCampos, setActiveCampos] = useState('');
    const navigate = useNavigate(); // Hook para la redirección

    const handleMetodoChange = (e) => {
        setMetodo(e.target.value);
        setActiveCampos(e.target.value);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!monto || !metodo || !tipo) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No estás autenticado.');
                return;
            }

            // Obtener el usuario y su ID
            const response = await api.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { id: userId } = response.data;

            // Enviar los datos de la recarga al backend
            await api.post(
                '/transactions',
                { monto, metodo, tipo, userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccess(`Recarga de ${monto} fue exitosa.`);
            setMonto('');
            setMetodo('');
            setTipo('recarga');

            // Redirigir a la página de adminBalance después de la recarga
            setTimeout(() => navigate('/adminBalance'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al realizar la recarga.');
        }
    };

    return {
        monto,
        metodo,
        tipo,
        error,
        success,
        activeCampos,
        setMonto,
        handleMetodoChange,
        handleSubmit,
    };
};

export default useRecargaSaldo;