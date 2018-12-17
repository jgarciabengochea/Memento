const Session = require('./../../database/schemas/Session.js');
const util = require('./../lib/hashUtils.js');

module.exports.createSession = (req, res, next) => {
  console.log('cookies: ', req.cookies);
  Promise.resolve(req.cookies.authToken)
    .then(hash => {
      if (!hash) {
        throw hash;
      }
      return Session.findOne({ hash }).exec();
    })
    .then(session => {
      if (!session) {
        throw session;
      }
      return session;
    })
    .catch(() => {
      const hash = util.createHash(util.createRandom16String());
      let session = new Session({ hash });
      return session.save()
        .then(result => {
          res.cookie('authToken', result.hash)
          return result;
        })
    })
    .then(session => {
      req.session = session;
      next();
    })
}