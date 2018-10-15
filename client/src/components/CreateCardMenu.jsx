import React from 'react';
import CardModel from '../Models/CardModel.jsx';
import axios from 'axios';

export default class CreateCardMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFront: '',
      cardBack: ''
    }
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  addCardToDeck() {
    let card = new CardModel(this.state.cardFront, this.state.cardBack);
    this.props.deck.cards.push(card);
  }
  
  sendChromeMessage(target, type, modal, deck) {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target,
        type,
        modal,
        deck
      }
    );
  }

  onCardCompletion() {
    this.addCardToDeck();
    this.sendChromeMessage('background', 'cardDone', 'CreateCard', this.props.deck);
    document.getElementById('createCard').reset();
  }

  onSaveDeck() {
    if (this.state.cardFront && this.state.cardBack) {
      this.addCardToDeck();
    }
    axios.post('http://192.168.1.93:3000/momento/decks', this.props.deck)
      .then(() => console.log('POSTED PLEASE'))
      .catch(err => console.error(err));
    this.sendChromeMessage('background', 'returnHome', 'Home');
  }

  render() {
    return (
      <div>
        <form id="createCard">
          Front:
          <input id='cardFront' type='text' name='cardFront' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          Back:
          <input id='cardBack' type='text' name='cardBack' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          <button onClick={(e) => {e.preventDefault(); this.onCardCompletion();}}>Add Card To Deck</button>
          <button onClick={(e) => {e.preventDefault(); this.onSaveDeck()}}>Save Deck!*</button>
          <p>*Unifinshed cards will not be saved to the deck.</p>
        </form>
      </div>
    );
  }
}