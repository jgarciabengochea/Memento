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
      decks: [],
      currentQuizDeck: {},
      currentDeckEditing: {},
      results: {}
    };
    this.modals = {
      Home,
      CreateDeck,
      CreateCard,
      DecksMenu,
      QuizDisplay,
      QuizResults
    };
    this.handleChangeModal = this.handleChangeModal.bind(this);
    this.getDecks = this.getDecks.bind(this);
  }
  
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleChromeMessage);
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

  updateQuizResults({modal, results}) {
    this.setState({
      currentModal: modal,
      results: results
    });
  }
  // TODO: make function more readable
  handleChromeMessage(msg) {
    if (msg.target === 'App') {
      if (msg.type === 'results') {
        this.updateQuizResults(msg);
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

  setModalAndProps(currentModal) {
    let props = {};
    if (currentModal === 'Home') {
      props.decks = this.state.decks;
      props.quizDeck = this.state.currentQuizDeck;
    } else if (currentModal === 'QuizDisplay') {
      props.deck = this.state.currentQuizDeck;
    } else if (currentModal === 'CreateCard') {
      props.deck = this.state.currentDeckEditing;
    } else if (currentModal === 'DecksMenu') {
      props.decks = this.state.decks;
    } else if (currentModal === 'QuizResults') {
      props.results = this.state.results;
      props.quizDeck = this.state.currentQuizDeck;
    }
    let modal = this.setState[currentModal];
    return React.createElement(modal, props);
  }

  render() {
    let modal = this.setModalAndProps(this.state.currentModal);
    return (
      <div>
        {modal}
      </div>
    );
  }
}