import express from 'express';
import { saveUserProgress, getUserProgress, getAllUsersProgress } from '../controllers/progressController.js';

const router = express.Router();

router.post('/saveProgress', saveUserProgress);
router.get('/getProgress', getUserProgress);

router.get('/getAllUsers', getAllUsersProgress);

export default router;
