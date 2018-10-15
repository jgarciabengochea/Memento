import React from 'react';
import Home from './Home.jsx';
import CreateDeckMenu from './CreateDeckMenu.jsx';
import CreateCardMenu from './CreateCardMenu.jsx';
import DecksMenu from './DecksMenu.jsx';
import QuizDisplay from './QuizDisplay.jsx';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: 'Home',
      modals: {
        Home: Home,
        CreateDeck: CreateDeckMenu,
        CreateCard: CreateCardMenu,
        DecksMenu,
        QuizDisplay
      },
      decks: [],
      currentQuizDeck: {},
      currentDeckEditing: {}
    };
    this.handleChangeModal = this.handleChangeModal.bind(this);
    this.getDecks = this.getDecks.bind(this);
  }
  
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleChangeModal);
    this.getDecks();
  }
  
  getDecks() {
    axios.get('http://localhost:3000/momento/decks')
    .then((response) => {
      console.log(responose.data);
      this.setState({ 
        decks: response.data,
        currentQuizDeck: response.data[0]
      });
    })
    .catch(err => console.error(err));
  }

  handleChangeModal(msg) {
    if (msg.target === 'App') {
      this.setState({
        currentModal: msg.modal,
        currentDeckEditing: msg.deck || {},
        currentQuizDeck: msg.quizDeck || this.state.currentQuizDeck
      }, () => {
        if (this.state.currentModal === 'Home') {
          this.getDecks();
        }
      });
    }
  }

  render() {
    let props = {};
    if (this.state.currentModal === 'Home') {
      props.decks = this.state.decks;
      props.quizDeck = this.state.currentQuizDeck;
    } else if (this.state.currentModal === 'QuizDisplay') {
      props.deck = this.state.currentQuizDeck;
    } else if (this.state.currentModal === 'CreateCard') {
      props.deck = this.state.currentDeckEditing;
    } else if (this.state.currentModal === 'DecksMenu') {
      props.decks = this.state.decks;
    }
    let modal = React.createElement(this.state.modals[this.state.currentModal], props)
    return (
      <div>
        {modal}
      </div>
    );
  }
}