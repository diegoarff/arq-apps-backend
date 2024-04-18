import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/index.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use('/', routes);
app.use(errorHandler);
app.get('/crash', (req, res) => process.exit(1));

export default app;
