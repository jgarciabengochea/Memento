import React from 'react';
import Home from './Home.jsx';
import CreateDeck from './CreateDeckMenu.jsx';
import CreateCard from './CreateCardMenu.jsx';
import QuizDisplay from './QuizDisplay.jsx';
import QuizResults from './QuizResults.jsx'
import getDecks from './../../controllers/getDecks.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 'Home',
      decks: [],
      quizDeck: {},
      currentDeckEditing: {},
      results: {}
    };
    this.modals = {
      Home,
      CreateDeck,
      CreateCard,
      QuizDisplay,
      QuizResults
    };
    this.setModalAndProps = this.setModalAndProps.bind(this);
    this.updateQuizResults = this.updateQuizResults.bind(this);
    this.setDecksAndQuizDeck = this.setDecksAndQuizDeck.bind(this);
  }
  
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleChromeMessage.bind(this));
    this.setDecksAndQuizDeck();
  }
  
  setDecksAndQuizDeck() {
    getDecks()
      .then(decks => {
        this.setState({ 
          decks,
          quizDeck: decks[0],
        });
      })
      .catch(err => console.error(err));
  }

  updateQuizResults({modal, results}) {
    this.setState({
      modal: modal,
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
            modal: msg.modal,
            currentDeckEditing: msg.deckEditing || {},
            quizDeck: msg.quizDeck || this.state.quizDeck
          }, 
          () => {
            if (this.state.modal === 'Home') {
              this.setDecksAndQuizDeck();
            }
          }
        );
      }
    }
  }

  setModalAndProps(modalName) {
    let props = {};
    if (modalName === 'Home') {
      props.decks = this.state.decks;
      props.quizDeck = this.state.quizDeck;
    } else if (modalName === 'QuizDisplay') {
      props.deck = this.state.quizDeck;
    } else if (modalName === 'CreateCard') {
      props.deck = this.state.currentDeckEditing;
    } else if (modalName === 'DecksMenu') {
      props.decks = this.state.decks;
    } else if (modalName === 'QuizResults') {
      props.results = this.state.results;
      props.quizDeck = this.state.quizDeck;
    }
    let modal = this.modals[modalName];
    return React.createElement(modal, props);
  }

  render() {
    let modal = this.setModalAndProps(this.state.modal);
    return (
      <div>
        {modal}
      </div>
    );
  }
}