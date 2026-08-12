import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});