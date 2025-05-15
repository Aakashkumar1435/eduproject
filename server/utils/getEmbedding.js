import axios from 'axios';

export async function getEmbedding(text) {
  const url = `https://generativelanguage.googleapis.com/v1/models/text-embedding-004:embedContent?key=${process.env.EMBEDDING_API_KEY}`;
  const res = await axios.post(url, {
    content: {
      parts: [{ text }]
    }
  });
  return res.data.embedding.values;
}
