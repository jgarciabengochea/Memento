import React from 'react';
import Home from './Home.jsx';
import CreateDeckMenu from './CreateDeckMenu.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: 'Home',
      modals: {
        Home: <Home />,
        CreateDeck: <CreateDeckMenu />
      }
    };
    this.handleChangeModal = this.handleChangeModal.bind(this);
  }
  
  componentDidMount() {
    chrome.runtime.onMessage.addListener(this.handleChangeModal);
  }

  handleChangeModal(msg) {
    if (msg.target === 'App') {
      console.log('received by app');
      this.setState({
        currentModal: msg.modal
      });
    }
  }

  render() {
    let modal = this.state.modals[this.state.currentModal]
    console.log(modal);
    return (
      <div>
        {modal}
      </div>
    );
  }
}