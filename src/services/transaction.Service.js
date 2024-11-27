import Transaction from '../models/transaction.model.js';
import User from '../models/user.models.js'; 

// Obtener todas las transacciones
export const getAllTransactions = async (filters = {}, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Transaction.find(filters).skip(skip).limit(limit);
};

// Obtener transacciones por usuario
export const getTransactionsByUserId = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return await Transaction.find({ userId }).skip(skip).limit(limit);
};

// Crear una nueva transacción
export const createTransaction = async (transactionData) => {
    const { userId, monto, tipo } = transactionData;

    // Validar que los datos necesarios están presentes
    if (!userId || !monto || !tipo) {
        throw new Error('El usuario, el monto y el tipo son obligatorios.');
    }

    // Buscar al usuario
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado.');
    }

    // Actualizar el saldo según el tipo de transacción
    if (tipo === 'recarga') {
        user.saldo += Number(monto); // Asegurar que monto sea un número
    } else if (tipo === 'retiro') {
        if (user.saldo < Number(monto)) {
            throw new Error('Saldo insuficiente para realizar el retiro.');
        }
        user.saldo -= Number(monto); // Asegurar que monto sea un número
    }

    // Guardar los cambios en el saldo del usuario
    await user.save();

    // Crear y guardar la transacción
    const transaction = new Transaction(transactionData);
    return await transaction.save();
};

// Actualizar una transacción por ID
export const updateTransactionById = async (id, transactionData) => {
    return await Transaction.findByIdAndUpdate(id, transactionData, { new: true });
};

// Eliminar una transacción por ID
export const deleteTransactionById = async (id) => {
    return await Transaction.findByIdAndDelete(id);
};