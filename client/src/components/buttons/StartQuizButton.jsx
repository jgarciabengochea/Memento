import React from 'react';
export default class StartQuizButton extends React.Component { 
  constructor(props) {
    super(props);
  }
  
  handleStartQuizClick() {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target: 'background',
        type: 'startQuiz',
        deck: this.props.deck,
        modal: 'QuizDisplay'
      }
    );
  }

  render() {
    return (
      <div>
        <button className='button' onClick={() => this.handleStartQuizClick()}>Start Remebering!</button>
      </div>
    );
  }
}
