import express from 'express';
import { saveUserProgress, getUserProgress } from '../controllers/progressController.js';

const router = express.Router();

router.post('/saveProgress', saveUserProgress);
router.get('/getProgress', getUserProgress);

export default router;
