import React from 'react';
import Card from './../Models/Card.jsx';

export default class CreateCardMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFront: this.props.front || '',
      cardBack: this.props.back || ''
    }
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onCardCompletion() {
    let card = new Card(this.state.cardFront, this.state.cardBack);
    this.props.deck.cards.push(card);
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target: 'background',
        type: 'cardDone',
        deck: this.props.deck,
        modal: 'CreateCard'
      }
    );
    document.getElementById('createCard').reset();
  }

  render() {
    return (
      <div>
        <form id="createCard">
          Front:
          <input id='cardFront' type='text' name='cardFront' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          Back:
          <input id='cardBack' type='text' name='cardBack' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          <button onClick={(e) => {e.preventDefault(); this.onCardCompletion();}}>Done</button>
        </form>
      </div>
    );
  }
}