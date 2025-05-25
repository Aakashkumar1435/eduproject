import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import apiRoutes from './routes/api/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000", // your frontend origin
  credentials: true,               // 🔥 Allow cookies
}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/videos', express.static(path.join(__dirname, 'video')));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello from MERN server!');
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
