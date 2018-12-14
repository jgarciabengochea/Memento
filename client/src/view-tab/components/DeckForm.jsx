import React, { Component } from 'react';
import UpdateDeckButton from './../../buttons/UpdateDeckButton.jsx';
import updateDeck from './../../controllers/updateDeck.js';

export default class DeckForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:this.props.oldDeck.name || '',
      description: this.props.oldDeck.description || ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  submitChanges(e) {
    e.preventDefault();
    const oldDescription = this.props.oldDeck.description;
    const data = {
      oldName: this.props.oldDeck.name,
      name: this.state.name,
      description: this.state.description
    };
    if (data.oldName !== data.name || oldDescription !== data.description) {
      updateDeck(data)
        .then(this.props.setDecks)
        .catch(console.error);
    }
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Name: 
            <input 
              type='text'
              name ='name'
              value={ this.state.name }
              onChange={ this.handleInput }
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea 
              type='text'
              name ='description'
              value={ this.state.description }
              onChange={ this.handleInput }
              />
          </label>
        </div>
        <UpdateDeckButton submitChanges={ this.submitChanges } />
      </div>
    );
  }  
}