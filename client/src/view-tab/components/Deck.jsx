import React from 'react';
import axios from 'axios';
import { LOCAL_IP } from './../../../../config.js';
import CardDrawer from './CardDrawer.jsx';
import DeckForm from './DeckForm.jsx';

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      editing: false
    }
    this.handleDeleteDeck = this.handleDeleteDeck.bind(this);
    this.expandDeck = this.expandDeck.bind(this);
    this.editDeck = this.editDeck.bind(this);
  }

  handleDeleteDeck(e, name = this.props.deck.name) {
    e.preventDefault();
    axios.delete(`http://${LOCAL_IP}:3000/momento/deck`, { data: { name } })
      .then(this.props.setDecks)
      .catch(console.error);
  }

  expandDeck() {
    this.setState({ expanded: !this.state.expanded })
  }
  
  editDeck(deck = this.props.deck) {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    return (
      <div className='deck-container'>
        <div className='deck'>
          <div className='deck-name' onClick={ this.expandDeck } >{ this.props.deck.name }</div>
          <div className='deck-description' >{ this.props.deck.description }</div>
          <div>
            <div onClick={ this.editDeck } >edit</div>
            <div onClick={ this.handleDeleteDeck } >
              <img src='../lib/assets/trash.png' alt='settings icon'/>
            </div>
          </div>
        </div>
        {this.state.editing ? <DeckForm setDecks={ this.props.setDecks } oldDeck={ this.props.deck } /> : null}
        {this.state.expanded ? <CardDrawer cards={ this.props.deck.cards }/> : null}
      </div>
    );
  }
}