import express, { Request, Response } from 'express';
import router from './routes/index.ts';
import cors from 'cors';
import { register } from "node:module";
import { pathToFileURL } from "node:url";
register('ts-node/esm', pathToFileURL('./'));

const app = express();

app.use(express.json());

app.use(cors());

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));


app.get("/", (req, res) => {
    res.json({ message: "alive here!" });
});

app.use('/api/v1', router)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});