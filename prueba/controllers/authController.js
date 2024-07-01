// authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Skater from '../models/Skater.js';

export const loginView = (req, res) => {
    res.render('login');
};

export const getRegistro = (req, res) => {
    res.render('registro');
};

export const register = async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const skater = await Skater.create({
            email,
            nombre,
            password: hashedPassword,
            anos_experiencia: parseInt(anos_experiencia, 10),
            especialidad,
            foto: req.files.foto.name
        });

        req.files.foto.mv(`./public/images/${req.files.foto.name}`);

        res.status(201).json({ message: 'Skater registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const skater = await Skater.findOne({ where: { email } });

        if (!skater) {
            return res.status(404).json({ message: 'Skater not found' });
        }

        const validPassword = await bcrypt.compare(password, skater.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: skater.id, email: skater.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Guardar el token en una cookie
        res.cookie('token', token, { httpOnly: true });

        // Redirigir a la vista de datos con los datos del usuario
        res.render('datos', { user: skater });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


