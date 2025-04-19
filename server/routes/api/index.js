// routes/api/index.js - Main API router
import express from 'express';
import subjectRoutes from '../subjectRoutes.js';
import chapterRoutes from '../chapterRoutes.js';
import allRoutes from '../allRoutes.js';

const router = express.Router();

// Mount route groups
router.use('/subjects', subjectRoutes);
router.use('/chapters', chapterRoutes);
router.use('/all', allRoutes);

export default router;
