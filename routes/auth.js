import express from 'express';
import { getRegistro, register, loginView, login } from '../controllers/authController.js';

const router = express.Router();

// Ruta para mostrar la página de registro
router.get('/registro', getRegistro);

// Ruta para manejar el registro de nuevos skaters
router.post('/registro', register);

// Ruta para mostrar la página de inicio de sesión
router.get('/login', loginView);

// Ruta para manejar el inicio de sesión
router.post('/login', login);

export default router;
