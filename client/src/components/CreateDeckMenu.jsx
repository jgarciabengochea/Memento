import React from 'react';
import Deck from './../Models/Deck.jsx'

export default class CreateDeckMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
      deckDescription: ''
    }
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendDeckDoneMessage() {
    let deck = new Deck(this.state.deckName, this.state.deckDescription);
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target: 'background',
        type: 'deckDone',
        deck,
        modal: 'CreateCard'
      }
    );
  }

  render() {
    return (
      <div>
        <form>
          Name:
          <input id='deckName' type='text' name='deckName' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          Description:
          <input id='deckDescription' type='text' name='deckDescription' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          <button onClick={(e) => {e.preventDefault(); this.sendDeckDoneMessage();}}>Done</button>
        </form>
      </div>
    );
  }
}