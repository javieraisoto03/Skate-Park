// routes/skaters.js
import express from 'express';
import { updateProfile, deleteProfile } from '../controllers/skaterController.js';
const router = express.Router();

// Ruta para actualizar el perfil
router.post('/profile/update', updateProfile);

// Ruta para eliminar el perfil
router.post('/profile/delete', deleteProfile);

export default router;
