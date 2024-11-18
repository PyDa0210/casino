import jwt from 'jsonwebtoken';

// Generar un token
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Verificar un token
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};