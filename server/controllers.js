const { saveDeck, findOneDeck } = require('../database/dbHelpers.js');

const postDeck = (req, res) => {
  saveDeck(req.body, res);
};

const getOneDeck = (req, res) => {

};

const getAllDecks = (req, res) => {

};

module.exports = {
  postDeck,
  getOneDeck,
  getAllDecks
};