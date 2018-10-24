import React from 'react';
import Home from './Home.jsx';
import CreateDeck from './CreateDeckMenu.jsx';
import CreateCard from './CreateCardMenu.jsx';
import DecksMenu from './DecksMenu.jsx';
import QuizDisplay from './QuizDisplay.jsx';
import QuizResults from './QuizResults.jsx'
import axios from 'axios';
import { LOCAL_IP } from './../../../config.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: 'Home',
      modals: {
        Home: Home,
        CreateDeck,
        CreateCard,
        DecksMenu,
        QuizDisplay,
        QuizResults
      },
      decks: [],
      currentQuizDeck: {},
      currentDeckEditing: {},
      results: {}

    };
    this.handleChangeModal = this.handleChangeModal.bind(this);
    this.getDecks = this.getDecks.bind(this);
  }
  
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleChangeModal);
    this.getDecks();
  }
  
  getDecks() {
    axios.get(`http://${LOCAL_IP}:3000/momento/decks`)
    .then((response) => {
      this.setState({ 
        decks: response.data,
        currentQuizDeck: response.data[0],

      });
    })
    .catch(err => console.error(err));
  }

  handleChangeModal(msg) {
    if (msg.target === 'App') {
      if (msg.type === 'results') {
        this.setState({
            currentModal: msg.modal,
            results: msg.results
        });
      } else {
        this.setState(
          {
            currentModal: msg.modal,
            currentDeckEditing: msg.deckEditing || {},
            currentQuizDeck: msg.quizDeck || this.state.currentQuizDeck
          }, 
          () => {
            if (this.state.currentModal === 'Home' || this.state.currentModal === 'DecksMenu') {
              this.getDecks();
            }
          }
        );
      }

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
    } else if (this.state.currentModal === 'QuizResults') {
      props.results = this.state.results;
      props.quizDeck = this.state.currentQuizDeck;

    }
    let modal = React.createElement(this.state.modals[this.state.currentModal], props)
    return (
      <div>
        {modal}
      </div>
    );
  }
}