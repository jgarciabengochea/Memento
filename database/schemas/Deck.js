const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
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

const DeckSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    index: true,
    unique: true
  },
  description: String,
  cards: [CardSchema],
  dateCreated: String
});

const Deck = mongoose.model('Deck', DeckSchema);

module.exports = Deck;