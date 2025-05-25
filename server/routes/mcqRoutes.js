import express from 'express';
const router = express.Router();

import { getMcqsByTestId } from '../controllers/mcqController.js';

router.get('/getMcqs', getMcqsByTestId);

export default router;