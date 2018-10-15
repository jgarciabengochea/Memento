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
  
  handleDeckSelection(e) {
    let decks = this.props.decks;
    this.setState({
      currentQuizDeck: decks[e.target.value]
    }, () => console.log(this.state.currentQuizDeck));
  }

  render() {
    return (
      <div id="home">
        MEMENTO
        <div>
          <StartQuizButton deck={this.state.currentQuizDeck}/>
          <select onChange={(e) => {this.handleDeckSelection(e)}}>
            {this.props.decks.map((deck, i) => {
              return <option key={deck.name} value={i}>{deck.name}</option>
            })}
          </select>
        </div>
        <ViewDeckButton />
        <CreateDeckButton />
      </div>
    );
  }
}