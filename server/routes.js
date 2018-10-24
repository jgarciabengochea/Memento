const express = require('express');
const router = express.Router();
const { postDeck, getOneDeck, getAllDecks, updateWithNewCards, handleDeleteDeck } = require('./controllers.js');

router.post('/decks', postDeck);

router.get('/decks', getAllDecks);

router.get('/deck', getOneDeck);

router.put('/deck', updateWithNewCards);

router.delete('/deck', handleDeleteDeck);

module.exports = router;