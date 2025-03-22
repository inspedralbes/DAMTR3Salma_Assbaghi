import express from 'express';
import { Jugador, Partida, Personatge } from '../mysql/index.js';

const router = express.Router();
//BBDD ENDPOINTS
router.get('/partides', async (req, res) => {
  try {
    const partides = await Partida.findAll();
    res.json(partides);
  } catch (err) {
    res.status(500).json({ error: 'Error obtenint partides', details: err.message });
  }
});
router.post('/partides', async (req, res) => {
  try {
    const partida = await Partida.create(req.body);
    res.status(201).json(partida);
  } catch (err) {
    res.status(500).json({ error: 'Error creant partida', details: err.message });
  }
});
router.get('/personatges', async (req, res) => {
  try {
    const personatges = await Personatge.findAll();
    res.json(personatges);
  } catch (err) {
    res.status(500).json({ error: 'Error obtenint personatges', details: err.message });
  }
}
);
router.post('/personatges', async (req, res) => {
  try {
    const personatge = await Personatge.create(req.body);
    res.status(201).json(personatge);
  } catch (err) {
    res.status(500).json({ error: 'Error creant personatge', details: err.message });
  }
}
);

router.get('/jugadors', async (req, res) => {
  try {
    const jugadors = await Jugador.findAll({ include: [Partida, Personatge] });
    res.json(jugadors);
  } catch (err) {
    res.status(500).json({ error: 'Error obtenint jugadors', details: err.message });
  }
});

router.post('/jugadors', async (req, res) => {
  try {
    const jugador = await Jugador.create(req.body);
    res.status(201).json(jugador);
  } catch (err) {
    res.status(500).json({ error: 'Error creant jugador', details: err.message });
  }
});


export default router;
