const { saveDeck, findOneDeck, findAllDecks, updateDeck, deleteDeck } = require('../database/dbHelpers.js');

const postDeck = (req, res) => {
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
};

const handleDeleteDeck = (req, res) => {
  deleteDeck(req.body.name, res);
};

module.exports = {
  postDeck,
  getOneDeck,
  getAllDecks,
  updateWithNewCards,
  handleDeleteDeck
};