import React from 'react';
import Deck from './Deck.jsx';

export default class DecksMenu extends React.Component {
  constructor(props) {
    super(props);
    // might convert to stateless functional and pass decks directly
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {this.props.decks.map((deck) => {
          return <Deck key={deck.name} deck={deck}/>;
        })}
      </div>
    );
  }
}