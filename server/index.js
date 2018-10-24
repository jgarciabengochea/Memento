const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes.js');
const port = process.env.PORT || 3000;
const db = require('./../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/momento', routes);

app.listen(port, () => {
  console.log(`Port ${port}, we read you loud and clear.`);
});