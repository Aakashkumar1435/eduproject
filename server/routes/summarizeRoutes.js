import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getEmbedding } from '../utils/getEmbedding.js';

dotenv.config();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, x, i) => sum + x * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, x) => sum + x * x, 0));
  const magB = Math.sqrt(b.reduce((sum, y) => sum + y * y, 0));
  return dot / (magA * magB);
}

router.post('/', async (req, res) => {
  try {
    console.log("📥 Request received on /api/summarize");
    console.log("Request body:", req.body);

    const { message, board, book } = req.body;
    const key = `${board}_${book}`.toLowerCase();

    const fileMap = {
      punjab_physics: 'Punjab_phy.txt',
      punjab_chemistry: 'Punjab_chem.txt',
      punjab_biology: 'Punjab_bio.txt',
      sindh_physics: 'Sindh_phy.txt',
      sindh_chemistry: 'Sindh_chem.txt',
      sindh_biology: 'Sindh_bio.txt',
      federal_physics: 'Federal_phy.txt',
      federal_chemistry: 'Federal_chem.txt',
      federal_biology: 'Federal_bio.txt',
      all_physics: 'All_phy.txt',
      all_chemistry: 'All_chem.txt',
      all_biology: 'All_bio.txt',
      all_all: 'All_boards.txt',
      punjab_all: 'Punjab_full.txt',
      sindh_all: 'Sindh_full.txt',
      federal_all: 'Federal_full.txt',
    };

    const fileName = fileMap[key];

    if (!fileName) {
      console.log("❌ Invalid board/book key:", key);
      return res.status(400).json({ error: `No syllabus found for ${board} + ${book}` });
    }

    const filePath = path.join(process.cwd(), 'public', 'syllabus', fileName);

    if (!fs.existsSync(filePath)) {
      console.log("❌ File does not exist:", filePath);
      return res.status(404).json({ error: `Syllabus file "${fileName}" not found.` });
    }

    const text = fs.readFileSync(filePath, 'utf-8');
    const rawChunks = text.split(/\n{2,}/).filter(p => p.length > 50);
    const allChunks = rawChunks.map(chunk => ({ chunk, board }));

    const userEmbedding = await getEmbedding(message);

    const scored = await Promise.all(
      allChunks.map(async ({ chunk }) => {
        const chunkEmbedding = await getEmbedding(chunk);
        const score = cosineSimilarity(userEmbedding, chunkEmbedding);
        return { chunk, board, score };
      })
    );

    const topChunks = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ chunk }) => `📘 ${board} Board:\n${chunk}`);

    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [
        {
          parts: [
            {
              text: `You are a helpful tutor. Use the following syllabus content to answer the question. If not found in syllabus, mention that it is out of syllabus:\n\n${topChunks.join(
                '\n\n---\n\n'
              )}\n\nQuestion: ${message}`,
            },
          ],
        },
      ],
    });

    const reply = result?.response?.text?.();
    console.log("✅ Gemini response:", reply);

    if (!reply) {
      return res.status(500).json({ error: "Gemini API did not return a valid response." });
    }

    res.json({ response: reply });

  } catch (err) {
    console.error('❌ AI Summarizer Error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'AI summarizer failed.' });
  }
});

export default router;
