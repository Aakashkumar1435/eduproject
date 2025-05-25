// routes/api/index.js - Main API router
import express from 'express';
import subjectRoutes from '../subjectRoutes.js';
import chapterRoutes from '../chapterRoutes.js';
import allRoutes from '../allRoutes.js';
import authRoutes from '../authRoutes.js';
import mcqRoutes from '../mcqRoutes.js';
import progressRoutes from '../progressRoutes.js';
import notesRoutes from '../notesRoutes.js';
import videoRoutes from '../videoRoutes.js';
import feedbackRoutes from '../feedbackRoutes.js';
import pricingRoutes from '../pricingRoutes.js';
import courseRoutes from '../courseRoutes.js';
import summarizeRoutes from '../summarizeRoutes.js';
import submissionRoute from '../submissionRoute.js';


const router = express.Router();

// Mount route groups
router.use('/subjects', subjectRoutes);
router.use('/chapters', chapterRoutes);
router.use('/all', allRoutes);
router.use('/auth', authRoutes);
router.use('/mcqs', mcqRoutes);
router.use('/progress', progressRoutes);
router.use('/user', authRoutes);
router.use('/notes', notesRoutes);
router.use('/videos', videoRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/pricing', pricingRoutes);
router.use('/courses', courseRoutes);
router.use('/summarize', summarizeRoutes);
router.use('/submit', submissionRoute);

export default router;
