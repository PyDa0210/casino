import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import { generateToken } from '../utils/jwt.js'; // Asegúrate de que este import exista



// Controlador  login
export const loginUser = async (req, res) => {
    const { correo, password } = req.body;

    try {
        // Buscar usuario por correo
        const user = await User.findOne({ correo }); // Asegúrate de que esta línea defina `user`
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Actualizar última actividad del usuario
        user.ultimaActividad = Date.now();
        await user.save();

        // Generar un token JWT
        const token = generateToken(user._id); // Aquí `user` ya está definido correctamente

        // Responder con el token y datos del usuario (sin contraseña)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }).json({
            message: 'Inicio de sesión exitoso',
            user: {
                id: user._id,
                nombres: user.nombres,
                correo: user.correo,
                rol: user.rol,
                ultimaActividad: user.ultimaActividad,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
};

//registro de usuarios 
export const registerUser = async (req, res) => {
    const { nombres, apellidos, correo, password, celular, tipoDocumento, numeroDocumento, fechaNacimiento, pais } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Crear un nuevo usuario
        const user = new User({
            nombres,
            apellidos,
            correo,
            password,
            celular,
            tipoDocumento,
            numeroDocumento,
            fechaNacimiento,
            pais,
        });

        await user.save();

        // Generar un token JWT
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: user._id,
                nombres: user.nombres,
                correo: user.correo,
                rol: user.rol,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
    }
};

// Cerrar sesión
export const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

// Verificar autenticación
export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'No autorizado, falta token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado', details: error.message });
    }
};
//olvido de contraseña
//restablecer
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Token inválido o expirado' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al restablecer contraseña', details: error.message });
    }
};