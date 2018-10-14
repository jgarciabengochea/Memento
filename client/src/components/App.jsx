import React from 'react';
import Home from './Home.jsx';
import CreateDeckMenu from './CreateDeckMenu.jsx';
import CreateCardMenu from './CreateCardMenu.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: 'Home',
      modals: {
        Home: Home,
        CreateDeck: CreateDeckMenu,
        CreateCard: CreateCardMenu
      },
      currentDeckEditing: {}
    };
    this.handleChangeModal = this.handleChangeModal.bind(this);
  }
  
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleChangeModal);
  }

  handleChangeModal(msg) {
    if (msg.target === 'App') {
      console.log(msg.deck);
      this.setState({
        currentModal: msg.modal,
        currentDeckEditing: msg.deck || {}
      });
    }
  }

  render() {
    let props = {};
    if (this.state.currentModal === 'CreateCard') {
      props.deck = this.state.currentDeckEditing;
      props.front = '',
      props.back = ''
    }
    let modal = React.createElement(this.state.modals[this.state.currentModal], props)
    return (
      <div>
        {modal}
      </div>
    );
  }
}