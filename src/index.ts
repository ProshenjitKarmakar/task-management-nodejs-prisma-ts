import express, { Request, Response } from 'express';
import router from './routes/index.ts';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

const allowedOrigins = ['http://localhost:3000', 'https://task-management-proshenjit.netlify.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
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