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

const findAllDecks = (cb) => {
  Deck.find()
    .exec()
    .then((decks) => cb.status(200).send(decks))
    .catch(err => cb.status(503).send(err));
};

const updateDeck = (name, cards, cb) => {
  Deck.update({ name }, { $set: { cards } })
    .exec()
    .then(() => cb.status(204).send())
    .catch(err => cb.status(503).send(err));
};

const deleteDeck = (name, cb) => {

};

module.exports = {
  saveDeck,
  findOneDeck,
  findAllDecks,
  updateDeck
};