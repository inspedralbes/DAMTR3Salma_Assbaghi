import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

mongoose.connect('mongodb+srv://a23salassass:salma@cluster0.nyb9g2u.mongodb.net/logs?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const logSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', logSchema);

router.post('/logs', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send(log);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).send(logs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
