// controllers/adminController.js

import Skater from '../models/Skater.js'; 

export const getAdminView = async (req, res) => {
  try {
    const skaters = await Skater.findAll(); // Obtener todos los skaters desde la base de datos
    res.render('admin', { skaters });
  } catch (error) {
    res.status(500).send('Error al obtener la vista de administrador');
  }
};

export const approveParticipant = async (req, res) => {
  const participantId = req.params.id;
  try {
    // Encontrar el skater por ID y actualizar su estado a aprobado
    const skater = await Skater.findByPk(participantId);
    if (skater) {
      skater.estado = true; // O el valor correspondiente que represente el estado aprobado
      await skater.save();
      res.redirect('/admin');
    } else {
      res.status(404).send('Participante no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al aprobar participante');
  }
};
