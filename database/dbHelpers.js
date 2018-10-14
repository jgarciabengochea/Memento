const Deck = require('./Models/Deck.js');

const saveDeck = (deckObj, cb) => {
  let deck = new Deck(deckObj);
  deck.save((err) => {
      if (err) {
        cb.status(503).send(err);
      } else {
        cb.status(201).send();
      }
  });
};

const findOneDeck = (name, cb) => {
  Deck.findOne({ name })
    .exec()
    .then(deck => cb.status(200).send(deck))
    .catch(err => cb.status(503).send(err));
};

module.exports = {
  saveDeck,
  findOneDeck
};