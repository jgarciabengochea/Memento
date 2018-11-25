import React from 'react';
import axios from 'axios';
import { LOCAL_IP } from './../../../../config.js';
import CardDrawer from './CardDrawer.jsx';

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
    this.expandDeck = this.expandDeck.bind(this);
  }

  handleDeleteDeck(name) {
    axios.delete(`http://${LOCAL_IP}:3000/momento/deck`, { data: { name }})
      .then(() => {
        this.props.setDecks();
      })
      .catch(err => console.error(err));
  }

  expandDeck() {
    this.setState({ expanded: !this.state.expanded})
  }

  render() {
    return (
      <div className='deck-container'>
        <div className='deck'>
          <div className='deck-name' onClick={this.expandDeck}>{this.props.deck.name}</div>
          <div className='deck-description'>{this.props.deck.description}</div>
          <div>
            <div>edit</div>
            <div onClick={() => this.handleDeleteDeck(this.props.deck.name)}>
              <img src='../lib/trash.png' alt='settings icon'/>
            </div>
          </div>
        </div>
        {this.state.expanded ? <CardDrawer cards={this.props.deck.cards}/> : null}
      </div>
    );
  }
}