import express from 'express';
import apiRouter from './routes/api.routes';
const app = express();
app.use(express.json());

app.use(apiRouter);
export default app;