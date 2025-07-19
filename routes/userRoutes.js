import express from 'express';
import { getMe, login, register } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/me', protect, getMe);

export default authRoutes;