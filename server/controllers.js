const { saveDeck, findOneDeck, findAllDecks, updateDeck } = require('../database/dbHelpers.js');

const postDeck = (req, res) => {
  console.log(req.body);
  saveDeck(req.body, res);
};

const getOneDeck = (req, res) => {
  console.log(req.query.name);
  findOneDeck(req.query.name, res);
};

const getAllDecks = (req, res) => {
  findAllDecks(res);
};

const updateWithNewCards = (req, res) => {
  updateDeck(req.body.name, req.body.cards, res);
}

module.exports = {
  postDeck,
  getOneDeck,
  getAllDecks,
  updateWithNewCards
};