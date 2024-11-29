// src/middlewares/validateUser.middleware.js
export const validateUser = (req, res, next) => {
    console.log('Datos recibidos:', req.body);
    const { nombres, apellidos, celular, numeroDocumento, fechaNacimiento, correo, password, pais, tipoDocumento } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (!nombres || !apellidos || !celular || !numeroDocumento || !fechaNacimiento || !correo || !password || !pais || !tipoDocumento) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }

    // Validación de `nombres` y `apellidos`
    if (typeof nombres !== 'string' || nombres.trim().length < 2 || nombres.trim().length > 50) {
        return res.status(400).json({ error: 'El campo nombres debe ser un texto entre 2 y 50 caracteres.' });
    }
    if (typeof apellidos !== 'string' || apellidos.trim().length < 2 || apellidos.trim().length > 50) {
        return res.status(400).json({ error: 'El campo apellidos debe ser un texto entre 2 y 50 caracteres.' });
    }

    // Validación de `celular`
    const celularRegex = /^\d{7,15}$/;
    if (!celularRegex.test(celular)) {
        return res.status(400).json({ error: 'El celular debe contener entre 7 y 15 dígitos numéricos.' });
    }

    // Validación de `numeroDocumento`
    if (typeof numeroDocumento !== 'string' || numeroDocumento.trim().length < 6 || numeroDocumento.trim().length > 20) {
        return res.status(400).json({ error: 'El número de documento debe tener entre 6 y 20 caracteres.' });
    }

    // Validación de `tipoDocumento`
    const tiposPermitidos = ['CC', 'CE', 'Pasaporte'];
    if (!tiposPermitidos.includes(tipoDocumento)) {
        return res.status(400).json({ error: `El tipo de documento debe ser uno de los siguientes: ${tiposPermitidos.join(', ')}` });
    }

    // Validación de `fechaNacimiento`
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime()) || nacimiento >= new Date()) {
        return res.status(400).json({ error: 'La fecha de nacimiento es inválida o está en el futuro.' });
    }

    // Validación de `correo`
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'El correo electrónico no tiene un formato válido.' });
    }

    // Validación de `password`
    if (typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    // Validación de `pais`
    if (typeof pais !== 'string' || pais.trim().length < 2) {
        return res.status(400).json({ error: 'El campo país debe ser un texto válido.' });
    }

    // Si todo está bien, pasar al siguiente middleware o controlador
    next();
};

export const validateLogin = (req, res, next) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: 'El correo y la contraseña son obligatorios.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'El correo no tiene un formato válido.' });
    }

    next();
};
