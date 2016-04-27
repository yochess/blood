'use strict'

let express = require('express');
let path = require('path');
let app = express();

let clientPath = path.resolve(__dirname + '/../client');

app.use(express.static(clientPath));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
