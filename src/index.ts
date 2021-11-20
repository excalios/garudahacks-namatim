// Use .env configs
require('dotenv').config();

import express, { Request, Response } from 'express';
import { Server } from 'http';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Database Connection
import db from './db';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.send('hello world');
});

const PORT: number = parseInt(process.env.PORT as string) || 3000;

const server: Server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Close the database & server connection
process.once('SIGTERM', () => {
    db.destroy(() => {
        console.log('Database connection is closed');
    });
    server.close();
    console.log('Server is closed');
});

process.once('SIGINT', () => {
    db.destroy(() => {
        console.log('Database connection is closed');
    });
    server.close();

    console.log('Server is closed');
});