import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Authentication will use a default secret.');
}

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