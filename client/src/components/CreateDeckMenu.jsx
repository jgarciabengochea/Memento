import React from 'react';

export default class CreateDeckMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleDoneClick(e) {

  }

  render() {
    return (
      <div>
        <form>
          <input id='deckName' type='text' name='deckName'>Name: </input>
          <input id='deckDescription' type='text' name='deckDescription'>Description: </input>
          <button onClick={(e) => {e.preventDefault(); this.handleAddCardClick(e);}}>Done</button>
        </form>
      </div>
    );
  }
}