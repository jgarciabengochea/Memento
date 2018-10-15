const { saveDeck, findOneDeck } = require('../database/dbHelpers.js');

const postDeck = (req, res) => {
  console.log(req.body);
  saveDeck(req.body, res);
};

const getOneDeck = (req, res) => {
  res.send('u just got got one');
};

const getAllDecks = (req, res) => {

};

module.exports = {
  postDeck,
  getOneDeck,
  getAllDecks
};