import React from 'react';
import StartQuizButton from './buttons/StartQuizButton.jsx';
import CreateDeckButton from './buttons/CreateDeckButton.jsx';
import ViewDeckButton from './buttons/ViewDecksButton.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuizDeck: this.props.quizDeck
    }
  }
  

  componentDidUpdate(prevProps) {
    if (this.props.quizDeck !== prevProps.quizDeck) {
      this.setState({
        currentQuizDeck: this.props.quizDeck
      });
    }
  }

  handleDeckSelection(e) {
    let decks = this.props.decks;
    this.setState({
      currentQuizDeck: decks[e.target.value]
    });
  }

  render() {
    return (
      <div id="home" className='container'>
        <div className='container'>
          <div id='title'>
            MEMENTO
          </div>
          <div>
            Deck: 
            <select onChange={(e) => {this.handleDeckSelection(e)}}>
              {this.props.decks.map((deck, i) => {
                return <option key={deck.name} value={i}>{deck.name}</option>
              })}
            </select>
          </div>
        </div>
        <div className='button-container'>
          <StartQuizButton deck={this.state.currentQuizDeck}/>
          <ViewDeckButton />
          <CreateDeckButton />
        </div>
      </div>
    );
  }
}