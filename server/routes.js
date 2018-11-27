const express = require('express');
const router = express.Router();
const { postDeck, getOneDeck, getAllDecks, updateWithNewCards, updateDeckProps, handleDeleteDeck } = require('./controllers.js');

router.post('/decks', postDeck);

router.get('/decks', getAllDecks);

router.get('/deck', getOneDeck);

router.put('/deck', updateWithNewCards);

router.put('/deck/edit', updateDeckProps);

router.delete('/deck', handleDeleteDeck);

module.exports = router;