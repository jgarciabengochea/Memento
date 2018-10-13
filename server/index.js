require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  console.log('U GOT IT');
  res.send('Hello World!');
});

app.use('/', express.static(path.resolve(__dirname, 'public/index.html')));

app.listen(port, () => {
  console.log(`Port ${port}, we read you loud and clear.`);
});