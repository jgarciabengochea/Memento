import React, { Component } from 'react';

export default class EditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFront: '',
      cardBack: ''
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <label>
            Front:
            <input id='cardFront' type='text' name='cardFront' autoComplete='off'/>
          </label>
        </div>
        <div>
          <label>
            Back:
            <textarea id='cardBack' type='text' name='cardBack' autoComplete='off'/>
          </label>
        </div>
      </div>
    );
  }
}