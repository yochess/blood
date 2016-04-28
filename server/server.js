'use strict'

let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');

let clientPath = path.resolve(__dirname + '/../client');

app.use(bodyParser.json());
app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/api/profile', (req, res) => {
  console.log(req.data);
  res.send('Profile Page');
});

app.post('/api/profile', (req, res) => {
  console.log('Post Profile',req.data);
  response.status(201).end();
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
