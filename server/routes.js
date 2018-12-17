const express = require('express');
const router = express.Router();
const { 
  isLoggedIn,
  postDeck,
  getOneDeck,
  getAllDecks, 
  updateWithNewCards, 
  updateDeckProps, 
  handleDeleteDeck,
  signupHandler,
  loginHandler
} = require('./controllers.js');

router.get('/', isLoggedIn)

router.post('/decks', postDeck);

router.get('/decks', getAllDecks);

router.get('/deck', getOneDeck);

router.put('/deck', updateWithNewCards);

router.put('/deck/edit', updateDeckProps);

router.delete('/deck', handleDeleteDeck);

router.post('/signup', signupHandler);

router.post('/login', loginHandler);

module.exports = router;
