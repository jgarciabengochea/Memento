const express = require('express');
const router = express.Router();
const controller = require('./controllers.js');

router.get('/', controller.isLoggedIn)

router.post('/decks', controller.postDeck);

router.get('/decks', controller.getAllDecks);

router.get('/deck', controller.getOneDeck);

router.put('/deck', controller.updateWithNewCards);

router.put('/deck/edit', controller.updateDeckProps);

router.delete('/deck', controller.handleDeleteDeck);

router.post('/signup', controller.signupHandler);

router.post('/login', controller.loginHandler);

module.exports = router;
