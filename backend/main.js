const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('HOLA');
});

// app.get('/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

app.listen(4000, () => {
  console.log('localhost:4000');
});
