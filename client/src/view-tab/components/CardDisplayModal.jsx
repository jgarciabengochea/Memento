import React, { Component } from 'react';

export default class CardDisplayModal extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    };

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    };
    return (
      <div>
        <div style={modalStyle}>
          <div className='card-front'>
            {this.props.card.front}
          </div>
          <div className='card-back'>
            {this.props.card.back}
          </div>
        </div>
        <div style={backdropStyle}></div>
      </div>
    )
  }
}