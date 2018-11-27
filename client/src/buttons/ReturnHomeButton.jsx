import React from 'react';

export default class ReturnHomeButton extends React.Component {
  constructor(props) {
    super(props);
  
  }
  
  sendChangeModalMessage(modal) {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target: 'background',
        type: 'returnHome',
        modal
      }
    );
  }

  render() {
    return (
      <div>
        <button className='button' onClick={() => this.sendChangeModalMessage('Home')}>Return to Home Page</button>
      </div>
    );
  }
}