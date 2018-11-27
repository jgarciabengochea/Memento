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
  
  createTab(e) {
    e.preventDefault();
    console.log('Hello birb');
    chrome.tabs.create({url: '../../views/view-decks.html'});
  };

  render() {
    return (
      <div>
        <button id='view' className='button' onClick={this.createTab}>View Decks!</button>
      </div>
    );
  }
}