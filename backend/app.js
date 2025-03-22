import express from 'express';
import dotenv from 'dotenv';
import endpoints from './microserveis/endpoints/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use('/api', endpoints);

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
