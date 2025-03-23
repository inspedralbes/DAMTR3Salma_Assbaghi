import express from 'express';
import dotenv from 'dotenv';
import Docker from 'dockerode';
import endpoints from './microserveis/endpoints/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', endpoints);

// Docker setup
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

// Rutas para gestionar contenedores
app.post('/api/docker/start', async (req, res) => {
  const { name } = req.body;
  const container = docker.getContainer(name);
  try {
    await container.start();
    res.json({ status: 'started', container: name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/docker/stop', async (req, res) => {
  const { name } = req.body;
  const container = docker.getContainer(name);
  try {
    await container.stop();
    res.json({ status: 'stopped', container: name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/docker/list', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    res.json(containers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
