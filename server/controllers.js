const { saveDeck, findOneDeck, findAllDecks } = require('../database/dbHelpers.js');

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

module.exports = {
  postDeck,
  getOneDeck,
  getAllDecks
};