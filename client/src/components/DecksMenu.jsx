import React from 'react';
import Deck from './Deck.jsx';
import ReturnHomeButton from './buttons/ReturnHomeButton.jsx';

export default class DecksMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className='decks-menu'>
        <div className='deck-container'>
          {this.props.decks.map((deck) => {
            return <Deck key={deck.name} deck={deck}/>;
          })}
        </div>
        <ReturnHomeButton />
      </div>
    );
  }
}
