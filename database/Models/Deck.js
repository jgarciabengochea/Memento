const mongoose = require('mongoose');
// TODO: add support for new deck and card props
const cardSchema = new mongoose.Schema({
  deckId: String,
  id: String,
  front: String,
  back: String,
  index: Number,
  bin: Number,
  correct: Number,
  incorrect: Number,
  dateCreated: String
});

const deckSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    index: true,
    unique: true
  },
  description: String,
  cards: [cardSchema],
  dateCreated: String
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;