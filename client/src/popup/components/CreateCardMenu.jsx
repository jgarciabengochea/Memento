import React from 'react';
import CardModel from '../../Models/CardModel.jsx';
import axios from 'axios';
import { LOCAL_IP } from './../../../../config.js';
import ReturnHomeButton from './../../buttons/ReturnHomeButton.jsx';

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
    let index = this.props.deck.cards.length;
    let card = new CardModel(this.state.cardFront, this.state.cardBack, index, this.props.deck.id);
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
    if (this.state.cardFront && this.state.cardBack) {
      this.addCardToDeck();
      this.sendChromeMessage('background', 'cardDone', 'CreateCard', this.props.deck);
      this.setState({
        cardFront: '',
        cardBack: ''
      }, () => {document.getElementById('createCard').reset();});
    }
  }
  
  // TODO: 
  // abstract return home message logic
  // make universal message sending function b/w components through bg script
  onSaveDeck() {
    if (this.state.cardFront && this.state.cardBack) {
      this.addCardToDeck();
    }
    axios.post(`http://${LOCAL_IP}:3000/momento/decks`, this.props.deck)
      .then(() => this.sendChromeMessage('background', 'returnHome', 'Home'))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='continer'>
        <form id="createCard">
          <div className='container create-card'>
            <div>
              <label>
                Front:
                <input id='cardFront' type='text' name='cardFront' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}} autoComplete='off'/>
              </label>
            </div>
            <div>
              <label>
                Back:
                <textarea id='cardBack' type='text' name='cardBack' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}} autoComplete='off'/>
              </label>
            </div>
          </div>
        </form>
        <div>
          <div className='button-container'>
            <button className='button' onClick={(e) => {e.preventDefault(); this.onSaveDeck()}}>Save Deck!*</button>
            <button className='button' onClick={(e) => {e.preventDefault(); this.onCardCompletion();}}>Add Card To Deck</button>
            <ReturnHomeButton />
          </div>
          <p>*Unifinshed cards will not be saved to the deck.</p>
        </div>
      </div>
    );
  }
}