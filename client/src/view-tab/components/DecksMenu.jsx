import React from 'react';
import Deck from './Deck.jsx';
import getDecks from './../../controllers/getDecks.js';

export default class DecksMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    }
    this.setDecks = this.setDecks.bind(this);
  }

  componentDidMount() {
    this.setDecks();
  }

  setDecks() {
    getDecks()
      .then(decks => this.setState({ decks }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className='deck-menu'>
        {this.state.decks.map((deck) => {
          return <Deck key={deck.name} deck={deck} setDecks={this.setDecks}/>;
        })}
      </div>
    );
  }
};
