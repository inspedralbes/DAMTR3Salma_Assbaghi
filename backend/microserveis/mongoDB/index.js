const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/logs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const logSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model('Log', logSchema);

app.post('/logs', async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).send(log);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
