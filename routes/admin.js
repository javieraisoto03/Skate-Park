// routes/admin.js
import { Router } from 'express';
import { getAdminView, approveParticipant } from '../controllers/adminController.js';

const router = Router();

router.get('/', getAdminView);
router.post('/approve/:id', approveParticipant);

export default router;
