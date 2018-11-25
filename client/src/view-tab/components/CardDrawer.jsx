import React, { Component } from 'react';
import Card from './Card.jsx';

export default class CardDrawer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='card-drawer'>
        {this.props.cards.map((card, i) => {
          return <Card key={i} card={card}/>
        })}
      </div>
    );
  }
}