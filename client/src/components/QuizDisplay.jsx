import React from 'react';
import Card from './Card.jsx';
import ReturnHomeButton from './buttons/ReturnHomeButton.jsx';

export default class QuizDisplay extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.deck);
    this.state = {
      deck: this.props.deck,
      cards: this.props.deck.cards,
      currentCard: this.props.deck.cards[0],
      showingFront: true,
      currentCardIndex: 0,
      correct: 0,
      incorrect: 0
    };
  }
  
  sendChangeModalMessage(modal) {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target: 'background',
        type: 'results',
        results: {
          correct: this.state.correct,
          incorrect: this.state.incorrect
        },
        modal
      }
    );
  }

  handleFlipCard() {
    this.setState({
      showingFront: !this.state.showingFront
    });
  }

  handleNextCard(index, correct) {
    let answer = 'correct';
    if (!correct) {
      answer = 'incorrect';
    }
    if (index + 1 < this.state.cards.length) {
      this.setState({
        currentCard: this.state.cards[index + 1],
        currentCardIndex: index + 1,
        [answer]: this.state[answer] + 1,
        showingFront: true
      });
    } else {
      this.setState({
        [answer]: this.state[answer] + 1,
        showingFront: true
      }, () => {this.sendChangeModalMessage('QuizResults')});
    }
  }

  render() {
    return(
      <div className='container'>
        <div className='quiz-top'>
          <div>
            {this.props.deck.name}
          </div>
          <div>
            <Card card={this.state.currentCard} showingFront={this.state.showingFront}/>
          </div>
        </div>
        <div className='button-container'>
          <div>
            <button className='button'onClick={() => this.handleFlipCard()}>Flip Card</button>
          </div>
          <div>
            <button className='button'onClick={() => {this.handleNextCard(this.state.currentCardIndex, true)}}>Correct</button>
          </div>
          <div>
            <button className='button'onClick={() => {this.handleNextCard(this.state.currentCardIndex, false)}}>Incorrect</button>
          </div>
          <div>
            <ReturnHomeButton />
          </div>
        </div>
      </div>
    );
  }
}