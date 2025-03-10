const express = require('express');
const app = express();

app.use = express();

app.get('/', (req, res) => {
  res.send("HOLA");
});

app.listen(4000, () => {
  console.log('Server is up!');
});