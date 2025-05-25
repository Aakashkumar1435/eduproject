import express from 'express';
const router = express.Router();

import { getChaptersBySubjectName, getDetailedFLPTestsBySubject } from '../controllers/subjectController.js';

router.get('/getChapters', getChaptersBySubjectName);
router.get('/detailedSubWiseTests', getDetailedFLPTestsBySubject);


export default router;