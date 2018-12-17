const Deck = require('./schemas/Deck.js');

// TODO: set response headers in controllers file
const saveDeck = (deckObj, cb) => {
  let deck = new Deck(deckObj);
  // refactor save to use promise
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

const updateDeckMetaData = (oldName, name, description) => new Promise((resolve, reject) => {
  Deck.update({ name: oldName }, { $set: { name, description } })
    .exec()
    .then(resolve)
    .catch(reject);
})

const deleteDeck = (name, cb) => {
  Deck.deleteOne({ name })
    .exec()
    .then(() => cb.status(204).send())
    .catch(err => cb.status(503).send(err));
};


module.exports = {
  saveDeck,
  findOneDeck,
  findAllDecks,
  updateDeck,
  updateDeckMetaData,
  deleteDeck
};