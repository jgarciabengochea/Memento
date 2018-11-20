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
  
  createTab() {
    console.log('Hello birb');
    chrome.tabs.create({url: '../view-decks.html'});
  };

  render() {
    return (
      <div>
        <button id='view' className='button' onClick={() => {this.createTab(); this.sendChangeModalMessage('DecksMenu')}}>View Decks!</button>
      </div>
    );
  }
}