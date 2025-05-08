import express from 'express';
const router = express.Router();

import { getDetailedChapterTestsByChapter } from '../controllers/chapterController.js';

router.get('/detailedChapWiseTests', getDetailedChapterTestsByChapter);

export default router;