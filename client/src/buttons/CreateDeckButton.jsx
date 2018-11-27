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
        type: 'createDeck',
        modal
      }
    );
  }

  render() {
    return (
      <div>
        <button className='button' onClick={() => this.sendChangeModalMessage('CreateDeck')}>Create a New Deck!</button>
      </div>
    );
  }
}