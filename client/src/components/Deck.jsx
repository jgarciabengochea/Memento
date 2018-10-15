import React from 'react';

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='deck'>
        <div className='deck-name'>{this.props.deck.name}</div>
        <div className='deck-description'>{this.props.deck.description}</div>
      </div>
    );
  }
}