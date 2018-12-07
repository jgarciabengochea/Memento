import React, { Component } from 'react';

export default class CardDisplayModal extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div>
        <div className='modal'>
          <div className='card-front'>
            {this.props.card.front}
          </div>
          <div className='card-back'>
            {this.props.card.back}
          </div>
        </div>
        <div className='modal-backdrop'></div>
      </div>
    )
  }
}