import React from 'react';

export default class CreateDeckMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: '',
      deckDescription: ''
    }
  }
  
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state);
    });
  }

  sendDeckDoneMessage() {
    
  }

  render() {
    return (
      <div>
        <form>
          Name:
          <input id='deckName' type='text' name='deckName' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          Description:
          <input id='deckDescription' type='text' name='deckDescription' onChange={(e) => {e.preventDefault(); this.handleInputChange(e)}}/>
          <button onClick={() => {e.preventDefault(); this.sendDeckDoneMessage();}}>Done</button>
        </form>
      </div>
    );
  }
}