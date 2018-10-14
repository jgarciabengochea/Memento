import React from 'react';
import StartQuizButton from './buttons/StartQuizButton.jsx';
import CreateDeckButton from './buttons/CreateDeckButton.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="home">
        <StartQuizButton />
        <CreateDeckButton />
      </div>
    );
  }
}