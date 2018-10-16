import React from 'react';
import DeckModel from './../Models/DeckModel.jsx';
import ReturnHomeButton from './buttons/ReturnHomeButton.jsx';

export default class CreateDeckMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
      deckDescription: '',
      incomplete: false
    }
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendDeckDoneMessage() {
    if (this.state.deckName && this.state.deckDescription) {
      let deck = new DeckModel(this.state.deckName, this.state.deckDescription);
      chrome.runtime.sendMessage(
        chrome.runtime.id,
        {
          target: 'background',
          type: 'deckDone',
          deck,
          modal: 'CreateCard'
        }
      );
    } else if (!this.state.incomplete) {
      this.setState({
        incomplete: !this.state.incomplete
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.incomplete ? <div>Please Fill Out Both Deck Fields</div> : null}
        <form>
          <div>
            <div>Name:</div>
            <input id='deckName' type='text' name='deckName' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          </div>
          <div>
            <div>Description:</div>
            <input id='deckDescription' type='text' name='deckDescription' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          </div>
          <div>
            <button className='button' onClick={(e) => {e.preventDefault(); this.sendDeckDoneMessage();}}>Done</button>
          </div>
          <div>
            <ReturnHomeButton />
          </div>
        </form>
      </div>
    );
  }
}