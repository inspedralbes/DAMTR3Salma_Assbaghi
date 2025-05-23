import express from 'express';
import { Usuari, Partida, Personatge } from '../mysql/index.js';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process'; // Import spawn from child_process
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta stats-service
router.use('/stats', express.static(path.join(__dirname, '../stats-service')));
//LOGIN I REGISTRE---------------------------------------------------------------------------------
router.post('/register', async (req, res) => {
  const { nom, usuari, contrassenya, id_personatge,admin } = req.body;

  if (!nom || !usuari || !contrassenya || !id_personatge) {
    return res.status(400).json({ error: 'Falten camps obligatoris.' });
  }

  try {
    const personatge = await Personatge.findByPk(id_personatge);
    if (!personatge) {
      return res.status(404).json({ error: 'Personatge no trobat.' });
    }

    const existent = await Usuari.findOne({ where: { usuari } });
    if (existent) {
      return res.status(409).json({ error: 'Usuari ja registrat.' });
    }

    const hash = await bcrypt.hash(contrassenya, 10);

    const jugador = await Usuari.create({
      nom,
      usuari,
      contrassenya: hash,
      id_personatge,
      admin,
    });

    res.status(201).json({ missatge: 'Jugador registrat correctament', jugador });
  } catch (error) {
    res.status(500).json({ error: 'Error registrant jugador', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { usuari, contrassenya } = req.body;

  if (!usuari || !contrassenya) {
    return res.status(400).json({ error: 'Falten camps obligatoris.' });
  }

  try {
    const jugador = await Usuari.findOne({ where: { usuari } });

    if (!jugador) {
      return res.status(404).json({ error: 'Usuari no trobat.' });
    }

    const valid = await bcrypt.compare(contrassenya, jugador.contrassenya);
    if (!valid) {
      return res.status(401).json({ error: 'Contrasenya incorrecta.' });
    }

    res.status(200).json({ missatge: 'Login correcte', jugador });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login', details: error.message });
  }
});

//BBDD ENDPOINTS ---------------------------------------------------------------------------------
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
router.get('/personatges/:id', async (req, res) => {
  try {
    const personatge = await Personatge.findByPk(req.params.id);
    if (personatge) {
      res.json(personatge);
    }
    else {
      res.status(404).json({ error: 'Personatge no trobat' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error obtenint personatge', details: err.message });
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

router.put('/personatges/:id', async (req, res) => {
  try {
    const personatge = await Personatge.findByPk(req.params.id);
    if (personatge) {
      await personatge.update(req.body);
      res.json(personatge);
    } else {
      res.status(404).json({ error: 'Personatge no trobat' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error actualitzant personatge', details: err.message });
  }
});

router.delete('/personatges/:id', async (req, res) => {
  try {
    const personatge = await Personatge.findByPk(req.params.id);
    if (personatge) {
      personatge.destroy();
      res.json(personatge);
    } else {
      res.status(404).json({ error: 'Jugador no trobat' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error eliminant jugador', details: err.message });
  }
});


router.get('/usuaris', async (req, res) => {
  try {
    const jugadors = await Usuari.findAll();
    res.json(jugadors);
  } catch (err) {
    res.status(500).json({ error: 'Error obtenint jugadors', details: err.message });
  }
});

router.post('/usuaris', async (req, res) => {
  try {
    const jugador = await Usuari.create(req.body);
    res.status(201).json(jugador);
  } catch (err) {
    res.status(500).json({ error: 'Error creant jugador', details: err.message });
  }
});
router.get('/usuaris/:id', async (req, res) => {
  try {
    const jugador = await Usuari.findByPk(req.params.id, { include: [Partida, Personatge] });
    if (jugador) {
      res.json(jugador);
    } else {
      res.status(404).json({ error: 'Jugador no trobat' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error obtenint jugador', details: err.message });
  }
});

router.put('/usuaris/:id', async (req, res) => { 
  try {
    const jugador = await Usuari.findByPk(req.params.id);
    if (jugador) {
      jugador.update(req.body);
      res.json(jugador);
    } else {
      res.status(404).json({ error: 'Jugador no trobat' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error modificant jugador', details: err.message });
  }
}
);

  router.delete('/usuaris/:id', async (req, res) => {
    try {
      const jugador = await Usuari.findByPk(req.params.id);
      if (jugador) {
        jugador.destroy();
        res.json(jugador);
      } else {
        res.status(404).json({ error: 'Jugador no trobat' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error eliminant jugador', details: err.message });
    }
  });
  router.get('/estadistiques', (req, res) => {
    const imagePath = path.join(__dirname, '../stats-service/estadistiques.png');
    
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'No s\'ha trobat la imatge de les estadístiques.' });
      }
  
      res.sendFile(imagePath);
    });
  });
  
  router.get('/estadistiques_usuaris', (req, res) => {
    const imagePath = path.join(__dirname, '../stats-service/estadistiques_usuaris.png');
    
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'No s\'ha trobat la imatge de les estadístiques.' });
      }
  
      res.sendFile(imagePath);
    });
  });
  router.get('/estadistiques_jugadors', (req, res) => {
    const imagePath = path.join(__dirname, '../stats-service/jugadors.png');
    
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'No s\'ha trobat la imatge de les estadístiques.' });
      }
  
      res.sendFile(imagePath);
    });
  });


router.post('/start-service', (req, res) => {
  const { service } = req.body;
  if (!service) {
    return res.status(400).json({ error: 'Service name is required.' });
  }

  const servicePath = path.join(__dirname, `../${service}`);
  const serviceProcess = spawn('node', [servicePath]);

  serviceProcess.stdout.on('data', (data) => {
    console.log(`Service ${service} output: ${data}`);
  });

  serviceProcess.stderr.on('data', (data) => {
    console.error(`Service ${service} error: ${data}`);
  });

  serviceProcess.on('close', (code) => {
    console.log(`Service ${service} stopped with code ${code}`);
  });

  res.status(200).json({ message: `Service ${service} started.` });
});

router.post('/stop-service', (req, res) => {
  const { service } = req.body;
  if (!service) {
    return res.status(400).json({ error: 'Service name is required.' });
  }
  res.status(200).json({ message: `Service ${service} stopped.` });
});

  export default router;
