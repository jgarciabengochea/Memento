const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  hash: {
    type: String,
    unique: true,
    required: true
  },
  userId: String
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
