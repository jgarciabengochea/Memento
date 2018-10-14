const express = require('express');
const router = express.Router();
const { postDeck, getOneDeck, getAllDecks } = require('./controllers.js');

router.post('/decks', postDeck);

router.get('/decks', getAllDecks);

router.get('/deck', getOneDeck);

module.exports = router;