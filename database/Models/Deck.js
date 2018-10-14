const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  front: String,
  back: String,
  bin: Number,
  correct: Number,
  incorrect: Number,
});

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true
  },
  description: String,
  cards: [cardSchema]
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;