import React from 'react';
import CardListEntry from './CardListEntry.jsx';

const CardList = ({ cards }) => (
  <div className='card-drawer'>
    {cards.map((card, i) => {
      return <CardListEntry key={i} card={card}/>
    })}
  </div>
);

export default CardList;