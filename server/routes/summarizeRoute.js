import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getEmbedding } from '../../utils/getEmbedding.js';

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
    const { message, board } = req.body;

    const fileMap = {
      Punjab: 'Punjab_bio.txt',
      Sindh: 'Sindh_bio.txt',
      Federal: 'Federal_bio.txt',
    };

    let allChunks = [];

    // ✅ Load syllabus based on selection
    const boardsToLoad = board === 'All' ? Object.keys(fileMap) : [board];

    for (const b of boardsToLoad) {
      const filePath = path.join(process.cwd(), 'public', 'syllabus', fileMap[b]);
      if (!fs.existsSync(filePath)) continue;

      const text = fs.readFileSync(filePath, 'utf-8');
      const rawChunks = text.split(/\n{2,}/).filter(p => p.length > 50);

      const taggedChunks = rawChunks.map(chunk => ({
        chunk,
        board: b,
      }));

      allChunks.push(...taggedChunks);
    }

    if (allChunks.length === 0) {
      return res.status(404).json({ error: 'No syllabus data found.' });
    }

    // Embed query
    const userEmbedding = await getEmbedding(message);

    // Score each chunk
    const scored = await Promise.all(
      allChunks.map(async ({ chunk, board }) => {
        const chunkEmbedding = await getEmbedding(chunk);
        const score = cosineSimilarity(userEmbedding, chunkEmbedding);
        return { chunk, board, score };
      })
    );

    // ✅ Use top 3 relevant chunks
    const topChunks = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ chunk, board }) => `📘 ${board} Board:\n${chunk}`);

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

    const reply = result.response.text();
    res.json({ response: reply });

  } catch (err) {
    console.error('❌ AI Summarizer Error:', err.message);
    res.status(500).json({ error: 'AI summarizer failed.' });
  }
});

export default router;
