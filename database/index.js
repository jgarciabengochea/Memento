const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED');
});

module.exports = db;