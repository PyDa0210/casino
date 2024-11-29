import express from 'express';
import { fetchUsers, fetchUserById, addUser, updateUser, deleteUser} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/', protect, fetchUsers); // Obtener todos los usuarios
router.get('/:id', protect, fetchUserById); // Obtener un usuario por ID
router.post('/', protect, addUser); // Crear un nuevo usuario
router.put('/:id', protect, updateUser); // Actualizar un usuario por ID
router.delete('/:id', protect, deleteUser); // Eliminar un usuario por ID

export default router;
