import express from 'express';
const router = express.Router();

import { getAllFullLengthTests } from '../controllers/allController.js';

router.get('/detailedFLPTests', getAllFullLengthTests);

export default router;