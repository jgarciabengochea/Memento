const { saveDeck, findOneDeck, findAllDecks, updateDeck, updateDeckMetaData, deleteDeck } = require('../database/dbHelpers.js');
const User = require('./../database/schemas/User.js');
const Session = require('./../database/schemas/Session.js');
const util = require('./lib/hashUtils.js');

// TODO: make this middleware function, add user prop to session
module.exports = {
  isLoggedIn: (req, res) => {
    Session.findOne({ hash: req.cookies.authToken })
      .exec()
      .then(session => {
        if (!session) {
          throw new Error('No session exists for this token');
        }
        return session.hash === req.cookies.authToken;
      })
      .then(isValid => {
        if (!isValid) {
          throw new Error('token is not valid')
        }
        res.send();
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send()
      })
  },
  postDeck: (req, res) => {
    saveDeck(req.body, res);
  },
  getOneDeck: (req, res) => {
    findOneDeck(req.query.name, res);
  },
  getAllDecks: (req, res) => {
    findAllDecks(res);
  },
  updateWithNewCards: (req, res) => {
    updateDeck(req.body.name, req.body.cards, res);
  },
  updateDeckProps: (req, res) => {
    const { oldName, name, description } = req.body;
    updateDeckMetaData(oldName, name, description)
      .then(() => res.status(204).send())
      .catch(() => res.status(503).send());
  },
  handleDeleteDeck: (req, res) => {
    deleteDeck(req.body.name, res);
  },
  // TODO: refactor this into seperate file later
  signupHandler: (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let [hash, salt] = util.createHash(req.body.password);
    // reject empty username, pw, email fields
    if (!email || !username) {
      res.status(400).send();
    } else {
      User.findOne({ email })
        .exec()
        .then(result => {
          if (result) {
            throw result;
          }
          let newUser = new User({ email, username, hash, salt });
          return newUser.save();
        })
        .then(results => {
          return Session.findOneAndUpdate({ hash: req.session.hash }, { userId: results._id })
            .exec()
            .then(() => {
              res.status(201).send(results.username);
            })
        })
        .catch(user => {
          let error = new Error('An account already exists for this user');
          res.status(400).send(error);
        });
    }
  },
  // TODO: actually do something after comparing passwords
  loginHandler: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send();
    } else {
      User.findOne({ username })
        .exec()
        .then(user => {
          if (!user || !user.comparePassword(password)) {
            throw user;
          } 
          return Session.findOneAndUpdate({ hash: req.session.hash }, { userId: user._id })
            .exec()
        })
        .then(() => {
          res.status(201).send();
        })
        .catch(user => {
          res.status(503).send();
        })
    }
  }
};
