import express from 'express';
import dotenv from 'dotenv';
import endpoints from './microserveis/endpoints/index.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors()); 
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', endpoints);


app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
