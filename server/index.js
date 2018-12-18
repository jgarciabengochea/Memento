const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const db = require('./../database/index.js');
const auth = require('./middleware/auth.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth.createSession);
app.use(bodyParser.urlencoded({extended: true}));

app.use('/momento', routes);

app.listen(port, () => {
  console.log(`Port ${port}, we read you loud and clear.`);
});