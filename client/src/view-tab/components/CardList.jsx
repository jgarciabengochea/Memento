import React, { Component } from 'react';
import CardListEntry from './CardListEntry.jsx';

export default class CardList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='card-drawer'>
        {this.props.cards.map((card, i) => {
          return <CardListEntry key={i} card={card}/>
        })}
      </div>
    );
  }
}