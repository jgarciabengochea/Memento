const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

UserSchema.methods.comparePassword = function(attempt) {
  const hash = crypto.pbkdf2Sync(attempt, this.salt, 10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;