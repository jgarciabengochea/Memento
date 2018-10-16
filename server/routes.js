const express = require('express');
const router = express.Router();
const { postDeck, getOneDeck, getAllDecks, updateWithNewCards } = require('./controllers.js');

router.post('/decks', postDeck);

router.get('/decks', getAllDecks);

router.get('/deck', getOneDeck);

router.put('/deck', updateWithNewCards);

module.exports = router;