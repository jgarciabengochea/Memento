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
        modal: modal
      }, () => {
        console.log('sent');
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.sendChangeModalMessage('CreateDeck')}>Create a New Deck!</button>
      </div>
    );
  }
}