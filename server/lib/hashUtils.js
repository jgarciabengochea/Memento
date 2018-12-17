const crypto = require('crypto');

module.exports.createHash = (password) => {
  let salt = crypto.randomBytes(16).toString('hex');
  let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return [hash, salt];
};

module.exports.createRandom16String = () => {
  return crypto.randomBytes(16).toString('hex'); 
};