import React from 'react';
import Card from './Card.jsx';
import ReturnHomeButton from './buttons/ReturnHomeButton.jsx';
import axios from 'axios';
import { LOCAL_IP } from './../../../config.js';

const sortCardsByBin  = (cards) => {
  cards.sort((a, b) => (a.bin - b.bin));
  console.log(cards);
  return cards;
};

export default class QuizDisplay extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      deck: this.props.deck,
      cards: sortCardsByBin(this.props.deck.cards),
      currentCard: this.props.deck.cards[0],
      showingFront: true,
      currentCardIndex: 0,
      correct: 0,
      incorrect: 0,
      prevCards: [],
    };
  }
  
  updateDeck() {
    let updatedDeck = this.state.deck;
    updatedDeck.cards = this.state.prevCards;
    axios.put(`http://${LOCAL_IP}:3000/momento/deck`, updatedDeck)
      .then(() => console.log('PUTTED IT'))
      .catch(err => console.error(err));
  }

  sendChangeModalMessage(modal) {
    this.updateDeck();
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
    let answer;
    if (correct) {
      answer = 'correct';
      this.state.currentCard.correct += 1;
      if (this.state.currentCard.bin < 4) {
        this.state.currentCard.bin += 1;
      }
    } else if (!correct) {
      answer = 'incorrect';
      this.state.currentCard.incorrect += 1;
      this.state.currentCard.bin = 0;
    }
    let prevCards = [...this.state.prevCards, this.state.currentCard];
    if (index + 1 < this.state.cards.length) {
      this.setState({
        currentCard: this.state.cards[index + 1],
        currentCardIndex: index + 1,
        [answer]: this.state[answer] + 1,
        showingFront: true,
        prevCards
      });
    } else {
      this.setState({
        [answer]: this.state[answer] + 1,
        showingFront: true,
        prevCards
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