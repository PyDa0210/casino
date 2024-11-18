import User from '../models/user.models.js';

// Obtener todos los usuarios
export const getAllUsers = async (filters = {}, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await User.find(filters).skip(skip).limit(limit);
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
    return await User.findById(id).select('-password -__v'); // Excluir contraseña y versión
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
    if (!userData.correo || !userData.password) {
        throw new Error('El correo y la contraseña son obligatorios');
    }
    const existingUser = await User.findOne({ correo: userData.correo });
    if (existingUser) {
        throw new Error('El correo ya está registrado');
    }
    const user = new User(userData);
    return await user.save();
};

// Actualizar un usuario por ID
export const updateUserById = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
};

// Eliminar un usuario por ID
export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};
