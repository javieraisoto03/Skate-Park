// skaterController.js
import Skater from '../models/Skater.js';
import bcrypt from 'bcryptjs';

export const updateProfile = async (req, res) => {
    const { nombre, password, anos_experiencia, especialidad } = req.body;
    const userId = req.user.id; // Asumiendo que el ID del usuario está disponible en req.user

    try {
        const skater = await Skater.findByPk(userId);

        if (!skater) {
            return res.status(404).json({ message: 'Skater not found' });
        }

        skater.nombre = nombre;
        if (password) {
            skater.password = await bcrypt.hash(password, 10);
        }
        skater.anos_experiencia = anos_experiencia;
        skater.especialidad = especialidad;

        await skater.save();

        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProfile = async (req, res) => {
    const userId = req.user.id; // Asumiendo que el ID del usuario está disponible en req.user

    try {
        const skater = await Skater.findByPk(userId);

        if (!skater) {
            return res.status(404).json({ message: 'Skater not found' });
        }

        await skater.destroy();

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

