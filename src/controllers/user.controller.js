import {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
} from '../services/user.Service.js';

// Obtener todos los usuarios
export const fetchUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, nombre } = req.query;
        const filters = nombre ? { nombres: new RegExp(nombre, 'i') } : {}; // Filtro opcional por nombre
        const users = await getAllUsers(filters, page, limit);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
    }
};

// Obtener un usuario por ID
export const fetchUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
    }
};

// Crear un nuevo usuario
export const addUser = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario', details: error.message });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
    try {
        const user = await updateUserById(req.params.id, req.body);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el usuario', details: error.message });
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    try {
        const user = await deleteUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
    }
};
