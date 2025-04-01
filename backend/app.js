import express from 'express';
import dotenv from 'dotenv';
import endpoints from './microserveis/endpoints/index.js';
import mongo from './microserveis/mongoDB/index.js';

import cors from 'cors';
import { spawn } from 'child_process'; // Importar spawn para ejecutar scripts Python

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', endpoints);
app.use('/api', mongo);


setInterval(() => {
  console.log(' stats_generator.py...');
  const pythonProcess = spawn('python', ['./microserveis/stats-service/stats_generator.py']);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`sortida: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error en el script: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Proces finalitzat amb el codi: ${code}`);
  });
}, 5000); 

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});