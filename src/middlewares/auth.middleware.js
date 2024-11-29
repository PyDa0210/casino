import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado, falta el token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

