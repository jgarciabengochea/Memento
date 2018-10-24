import React from 'react';
import DeckModel from './../Models/DeckModel.jsx';
import ReturnHomeButton from './buttons/ReturnHomeButton.jsx';
import CardModel from './../Models/CardModel.jsx';
import axios from 'axios';
import { LOCAL_IP } from './../../../config.js';

export default class CreateDeckMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
      deckDescription: '',
      incomplete: false,
      fileUploaded: false,
      cardsFromFile: []
    }
  }
  
  handleFiles(e) {
    let file = e.target.files[0];
    console.log(file);
    if (file.type === 'text/csv') {
      let reader = new FileReader();
      reader.onload = () => {
        let cards = reader.result.split('\n').map((line) => line.split(',')).map((card) => new CardModel(card[0], card[1]));
        this.setState({
          cardsFromFile: cards,
          fileUploaded: !this.state.fileUploaded
        });
      }
      reader.readAsText(file);
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendChromeMessage(target, type, modal) {
    chrome.runtime.sendMessage(
      chrome.runtime.id,
      {
        target,
        type,
        modal
      }
    );
  }

  sendDeckDoneMessage() {
    if (this.state.deckName && this.state.deckDescription) {
      let deck = new DeckModel(this.state.deckName, this.state.deckDescription);
      if (this.state.fileUploaded) {
        deck.cards = this.state.cardsFromFile;
        axios.post(`http://${LOCAL_IP}:3000/momento/decks`, deck)
          .then(() => this.sendChromeMessage('background', 'returnHome', 'Home'))
          .catch(err => console.error(err));
      } else {
        chrome.runtime.sendMessage(
          chrome.runtime.id,
          {
            target: 'background',
            type: 'deckDone',
            deck,
            modal: 'CreateCard'
          }
        );
      }
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
          <div className='container'>
            <div>
              <div>Name:</div>
              <input id='deckName' type='text' name='deckName' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}} autoComplete='off'/>
            </div>
            <div>
              <div>Description:</div>
              <input id='deckDescription' type='text' name='deckDescription' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}} autoComplete='off'/>
            </div>
          </div>
          <div className='button-container'>
            <div>
              <button className='button' onClick={(e) => {e.preventDefault(); this.sendDeckDoneMessage();}}>Done</button>
            </div>
            <div>
              <div>Upload csv file to make cards (csv must be comma delimited and in form 'front,back')</div>
              <input type='file' name='file' onChange={(e) => {e.preventDefault(); this.handleFiles(e);}}/>
              {this.state.fileUploaded ? <div>Cards Uploaded! Fill out Deck information and Click Done!</div> : null}
            </div>
            <div>
              <ReturnHomeButton />
            </div>
          </div>
        </form>
      </div>
    );
  }
}