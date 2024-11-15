import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getNotifications, deleteNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.get('/delete', protectRoute, deleteNotifications);

export default router;