import express, { Request, Response } from 'express';
import router from './routes/index.ts';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000'  // Replace with your allowed domain
}));
app.get("/", (req, res) => {
    res.json({ message: "alive here!" });
});

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});