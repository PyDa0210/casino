import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Configuración de Axios

const useRetiroSaldo = () => {
    const [monto, setMonto] = useState('');
    const [metodo, setMetodo] = useState('');
    const [error, setError] = useState('');
    const [tipo, setTipo] = useState('retiro'); 
    const [success, setSuccess] = useState('');
    const [activeCampos, setActiveCampos] = useState('');
    const [codigoRetiro, setCodigoRetiro] = useState(null);
    const navigate = useNavigate();

    const handleMetodoChange = (e) => {
        setMetodo(e.target.value);
        setActiveCampos(e.target.value);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Limpiar los mensajes de error y éxito antes de intentar enviar la solicitud
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
    
            // Enviar los datos de la solicitud de retiro
            const retiroResponse = await api.post(
                '/transactions',  // Asegúrate de que esta es la ruta correcta para los retiros
                { monto, metodo, tipo, userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            // Si todo salió bien, mostrar el mensaje de éxito
            setSuccess(`Solicitud de retiro de ${monto} fue exitosa.`);
    
            // Limpiar los campos después de la solicitud exitosa
            setMonto('');
            setMetodo('');
    
            // Mostrar el código de retiro si está disponible
            setCodigoRetiro(retiroResponse.data.codigoCorresponsal || null);
    
            // Redirigir a la página de adminBalance después del retiro
            setTimeout(() => navigate('/adminBalance'), 2000);
    
        } catch (err) {
            // Si ocurre un error, manejarlo aquí y mostrar un mensaje de error
            setError(err.response?.data?.message || 'Error al realizar la solicitud de retiro.');
        }
    };    

    return {
        monto,
        metodo,
        tipo,
        error,
        success,
        activeCampos,
        codigoRetiro,
        setMonto,
        handleMetodoChange,
        handleSubmit,
    };
};

export default useRetiroSaldo;