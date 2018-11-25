import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div className='card'>
        <div className='card-text'>
          {this.props.showingFront ? this.props.card.front : this.props.card.back}
        </div>
      </div>
    );
  }
}