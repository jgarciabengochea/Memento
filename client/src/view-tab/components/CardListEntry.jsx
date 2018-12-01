import React, { Component } from 'react';
import CardDisplayModal from './CardDisplayModal.jsx';

export default class CardListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingModal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal() {
    this.setState({ showingModal: !this.state.showingModal });
  }

  render() {
    return(
      <div className='card-container'>
        <div>
          Front: {this.props.card.front}
        </div>
        <div>
          Back: {this.props.card.back}
        </div>
        <div>
          Correct: {this.props.card.correct}
        </div>
        <div>
          Incorrect: {this.props.card.incorrect}
        </div>
        <div onClick={this.toggleModal}>
          Try it out!
          {this.state.showingModal ? <CardDisplayModal card={this.props.card}/> : null}
        </div>
      </div>
    );
  }
}