import express from 'express';
import { protectRoute } from '../middlewares/protectRoute.js';
import { getMe, login, signup, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;