import React from 'react';

export default class CreateDeckButton extends React.Component {
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

  render() {
    return (
      <div>
        <button onClick={() => this.sendChangeModalMessage('DecksMenu')}>View Decks!</button>
      </div>
    );
  }
}