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
          Name:
          <input id='deckName' type='text' name='deckName'/>
          Description:
          <input id='deckDescription' type='text' name='deckDescription'/>
          <button onClick={(e) => {e.preventDefault(); this.handleAddCardClick(e);}}>Done</button>
        </form>
      </div>
    );
  }
}