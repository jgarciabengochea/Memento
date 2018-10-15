const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST;
mongoose.connect(`mongodb://${DB_HOST}:27017/mvp`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED');
});

module.exports = db;