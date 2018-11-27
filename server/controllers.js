const { saveDeck, findOneDeck, findAllDecks, updateDeck, updateDeckMetaData, deleteDeck } = require('../database/dbHelpers.js');

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

const updateDeckProps = (req, res) => {
  const { oldName, name, description } = req.body;
  updateDeckMetaData(oldName, name, description)
    .then(() => res.status(204).send())
    .catch(() => res.status(503).send());
};

const handleDeleteDeck = (req, res) => {
  deleteDeck(req.body.name, res);
};

module.exports = {
  postDeck,
  getOneDeck,
  getAllDecks,
  updateWithNewCards,
  handleDeleteDeck,
  updateDeckProps
};