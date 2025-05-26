import express from 'express';
import notes from './routes/notes.route.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import rateLimit from './middelwares/rateLimiter.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors({
    origin: 'https://thinkborad-frontend.vercel.app',
}));
app.use(express.json());
app.use(rateLimit)


app.use('/api/notes', notes);
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

