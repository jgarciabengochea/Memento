import React from 'react';
import axios from 'axios';
import { LOCAL_IP } from './../../../config.js';

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
  }
  
  sendChangeModalMessage(modal) {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target: 'background',
        type: 'viewDecks',
        modal
      }
    );
  }

  handleDeleteDeck(name) {
    axios.delete(`http://${LOCAL_IP}:3000/momento/deck`, { data: { name }})
      .then(() => {
        this.sendChangeModalMessage('DecksMenu');
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='deck'>
        <div className='deck-name'>{this.props.deck.name}</div>
        <div className='deck-description'>{this.props.deck.description}</div>
        <div>
          <img onClick={() => this.handleDeleteDeck(this.props.deck.name)} src='../lib/trash.png' alt='settings icon'/>
        </div>
      </div>
    );
  }
}