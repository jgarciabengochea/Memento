import React from 'react';

export default class QuizDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        {this.props.deck.name}
      </div>
    );
  }
}