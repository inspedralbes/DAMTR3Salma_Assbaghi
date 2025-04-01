import express from 'express';
import dotenv from 'dotenv';
import endpoints from './microserveis/endpoints/index.js';
import mongo from './microserveis/mongoDB/index.js';

import cors from 'cors';
import { spawn } from 'child_process'; 

dotenv.config();

const app = express();
app.use(cors());
const PORT = 25670;

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
}, 500000); 

app.listen(PORT, () => {
  console.log(`Servidor backend en http://supermariobros.dam.inspedralbes.cat:${PORT}`);
});