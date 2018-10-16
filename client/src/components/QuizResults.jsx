import React from 'react';
import ReturnHomeButton from './buttons/ReturnHomeButton.jsx'
export default class QuizResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div>
        Results
        <div>
          Correct: {this.props.results.correct}
        </div>
        <div>
          Incorrect: {this.props.results.incorrect}
        </div>
        <ReturnHomeButton />
      </div>
    );
  }
}