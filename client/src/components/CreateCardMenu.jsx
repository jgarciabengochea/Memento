import React from 'react';

export default class CreateCardMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    return (
      <div>
        <form>
          Front:
          <input id='cardFront' type='text' name='cardFront'/>
          Back:
          <input id='cardBack' type='text' name='cardBack'/>
          <button onClick={(e) => {e.preventDefault();}}>Done</button>
        </form>
      </div>
    );
  }
}